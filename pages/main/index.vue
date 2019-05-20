<template>
    <div>
        <h1>List of Products</h1>
        <productList></productList>
    </div>
</template>


<script>
import productList from '~/components/list/productList'
    export default {
        middleware:['check-auth','auth'],
        components:{
            productList
        }
            
    }
</script>