<template>
    <section class="container-section">
        <div class="container--outer">
            <div class="container--inner">
                <b-form @submit.prevent="onSubmit">
                    <transition name="fade" mode="out-in">
                        <div class="container--form--login" v-if="loginForm" key="login">
                            <h1 class="title">
                                Login
                            </h1>
                            <br>
                            <b-form-group>
                                <b-form-input  type="email" v-model="email" placeholder="Email" required></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input  type="password" v-model="password" placeholder="Password" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="container--form--register" v-else key="register">
                            <h1 class="title">
                                Register
                            </h1>
                            <br>
                            <b-form-group>
                                <b-form-input  type="email" v-model="email" placeholder="Email" required></b-form-input>
                            </b-form-group>
                            <b-form-group>
                                <b-form-input  type="password" v-model="password" placeholder="Password" required></b-form-input>
                            </b-form-group>
                        </div>
                    </transition>
                    <div class="switch-container">
                    <div class="switch-container--inne--button">
                        <b-button class="login-btn" type="submit">{{loginForm ? 'Login' : 'Register'}}</b-button>
                        <a href="#" class="noFormatLink" @click="authenticateFacebook"><i class="icofont-facebook"></i></a>
                    </div>
                    <div class="switch-container--inner">
                        <label class="switch"><input type="checkbox" id="togBtn" v-model="loginForm"><div class="slider round"></div></label>
                        &nbsp;
                        <p>{{loginForm ? 'Not registered?' : 'Have a account?' }}</p>
                        
                    </div>
                    
                </div>
                </b-form>
            </div>
        </div>
    </section>
</template>

<script>
import { setTimeout } from 'timers';
    export default {
        name:'AdminAuthPage',
        layout:'admin',
        data(){
            return {
                email:'',
                password:'',
                loginForm:true
            }
        },
        methods:{
            authenticateFacebook(){
                this.$store.dispatch('authenticateFacebook')
                    .then(()=>{
                        this.$router.push('/main')
                        this.$router.push('/main')
                    })
            },
            onSubmit(){
            this.$store.dispatch('authenticateUser',{
                isLogin:this.loginForm,
                email:this.email,
                password:this.password
            })
            .then(()=>{
                this.$router.push('/main')
                this.$router.push('/main')
            })
            }
        }   
    }
</script>

<style scoped>
    .container-section {
        margin: 0 auto;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    .title {
        font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
            'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    @media only screen and (max-width: 400px) {
        .title {
            font-size:50px;
        }
        .switch-container{
            flex-direction: columnn;
        }

        .container--inner {
            width:300px !important;
        }
        .login-btn{
            height:40px;
        }
    }


    .container--inner {
        width:400px;
    }

    .switch-container{
        display:flex;
        justify-content: space-between;
    }
    .switch-container--inner{
        display:flex;
    }

    .switch-container--inne--button{
        display:flex;
    }
</style>
