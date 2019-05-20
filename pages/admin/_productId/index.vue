<template>
    <div>
        <h1>Edit {{loadedProduct.name}}</h1>
        <adminProductForm :product="loadedProduct" :edit="true"  @submit="onSubmitted"/>
    </div>
</template>



<script>
import adminProductForm from '~/components/Admin/AdminProductForm'
    export default {
        data(){
            return {
                loadedProduct:{}
            }
        },
        components:{
            adminProductForm
        },
        asyncData(context) {
            return context.app.$axios
                    .$get(`${process.env.baseURL}/products/${context.params.productId}.json`)
                    .then(data=>{
                        return {
                            loadedProduct:{...data,id:context.params.productId}
                        }
                    })
                    .catch(e=>{context.error(e)})
        },
        methods:{
            onSubmitted(editedProduct){
                this.$store.dispatch('editProduct',editedProduct).then(()=>{
                    this.$router.push('/main')
                })
            }
        }
    }
</script>