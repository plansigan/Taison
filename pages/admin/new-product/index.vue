<template>
    <div class="newProduct-container">
        <h1>Create a product</h1>
        <adminProductForm  @submit="onSubmitted"/>
    </div>
</template>

<script>
import adminProductForm from '~/components/Admin/AdminProductForm'

    export default {
        middleware:['check-auth','auth'],
        components:{
            adminProductForm
        },
        methods:{
            onSubmitted(productData){
                this.$store.dispatch('addProduct',productData)
                    .then((data)=>{
                        this.$router.push('/main')
                        this.$store.commit('setCounter',0)
                    })
            }
        }
    }
</script>


<style scoped>
    .newProduct-container{
        text-align:left;
    }
</style>
