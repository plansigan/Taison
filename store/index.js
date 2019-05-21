import Vuex from 'vuex'
import Cookie from 'js-cookie'
import firebase from '~/plugins/firebase.js'

const createStore = () => {
    return new Vuex.Store({
        state:{
            loadedProducts:[],
            token:null,
            imageCounter:0
        },
        mutations:{
            setProducts(state,products){
                state.loadedProducts = products
            },
            addProduct(state,product){
                state.loadedProducts.push(product)
            },
            setCounter(state,counter){
                state.imageCounter = counter
            },
            setToken(state,token){
                state.token = token
            },
            clearToken(state){
                state.token = null
            },
            editProduct(state,editedProduct){
                const productIndex = state.loadedProducts.findIndex(product=> product.id === editedProduct.id);
                state.loadedProducts[productIndex] = editedProduct
            },
            deleteProduct(state,id){
                var arr = state.loadedProducts
                for(var i=0; i < arr.length; i++) {
                    if(arr[i].id == id)
                    {
                        arr.splice(i,1);
                    }
                 }

                 state.loadedProducts = arr
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return context.app.$axios
                    .$get(`${process.env.baseURL}/products.json`)
                    .then(data=>{
                        const productsArray = []
                        for(var key in data){
                            productsArray.push({...data[key],id:key})
                        }

                        vuexContext.commit('setProducts',productsArray)
                    })
                    .catch(e=>{context.error(e)})
            },
            addProduct(vuexContext,product){
                const createdProduct = {
                    ...product,updatedDate:new Date()
                }

                return this.$axios
                        .$post(`${process.env.baseURL}/products.json?auth=${vuexContext.state.token}`,createdProduct)
                        .then(data=>{
                            vuexContext.commit('addProduct',{...createdProduct,id:data.name})
                        })
                        .catch(e=>{console.log(e)})
            },
            editProduct(vuexContext,editedProduct){
                return this.$axios
                        .$put(`${process.env.baseURL}/products/${editedProduct.id}.json?auth=${vuexContext.state.token}`,editedProduct)
                        .then(data=>{
                            vuexContext.commit('editProduct',editedProduct)
                        })
            },
            uploadImage(vuexContext,image){

                var storageRef = firebase.storage().ref('image_folder/' + image.name)

                var task = storageRef.put(image)

                task.on('state_changed',
                    function progress(snapshot){
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                        vuexContext.commit('setCounter',percentage)
                    },

                    function error(err){

                    },

                    function (){
                        return {status:200}
                    }
                )

                return {status:200}
            },
            deleteProduct(vuexContext,id){
                return this.$axios.$delete(`${process.env.baseURL}/products/${id}.json?auth=${vuexContext.state.token}`)
                    .then(()=>{
                        vuexContext.commit('deleteProduct',id)
                    })
            },
            authenticateUser(vuexContext,authData){
                let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}` 
                
                if(!authData.isLogin) {
                    authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${process.env.fbAPIKey}`    
                }
                
                return this.$axios.$post(authUrl,{
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken: true
                    }).then(result => {
                            //store the token to state.token
                            vuexContext.commit('setToken',result.idToken);
                            localStorage.setItem('token',result.idToken);
                            localStorage.setItem('tokenExpiration',new Date().getTime()  + Number.parseInt(result.expiresIn) * 1000);
                            Cookie.set('jwt',result.idToken)
                            Cookie.set('expirationDate', new Date().getTime()  + Number.parseInt(result.expiresIn) * 1000)
                            
                    })
                    .catch(e => {
                        throw e
                    })
            },
            authenticateFacebook(vuexContext){
                var provider = new firebase.auth.FacebookAuthProvider();

                return firebase.auth().signInWithPopup(provider).then(function(result) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.user._lat
                    // console.log(result)

                    //store the token to state.token
                            vuexContext.commit('setToken',token);
                            localStorage.setItem('token',token);
                            localStorage.setItem('tokenExpiration',new Date().getTime()  + Number.parseInt(3600) * 1000);
                            Cookie.set('jwt',token)
                            Cookie.set('expirationDate', new Date().getTime()  + Number.parseInt(3600) * 1000)

                            return true
                    
                    // ...
                  }).catch(function(error) {
                      throw error
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                  });

                  
            },
            initAuth(vuexContext,req){
                let token;
                let expirationDate;
                if(req) {
                    if(!req.headers.cookie){
                        return
                    }

                    const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
                    if(!jwtCookie) {
                        return
                    }

                    token = jwtCookie.split('=')[1];
                    expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];
                } else {
                    token = localStorage.getItem('token')
                    expirationDate = localStorage.getItem('tokenExpiration');
                }
                
                if(new Date().getTime() > +expirationDate || !token){
                    vuexContext.dispatch('logout')
                    return;
                }
                
                vuexContext.commit('setToken',token);
                
            },
            logout(vuexContext){
                vuexContext.commit('clearToken');
                Cookie.remove('jwt');
                Cookie.remove('expirationDate');

                if(process.client){
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenExpiration');
                }

                return true
                
            }
        },
        getters:{
            loadedProducts(state){
                return state.loadedProducts
            },
            uploadCounter(state){
                return state.imageCounter
            },
            isAuthenticated(state){
                return state.token != null
            }
        }

    })
}

export default createStore