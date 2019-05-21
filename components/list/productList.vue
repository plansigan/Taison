<template>
    <div>
        <b-table responsive outlined striped hover :items="loadedProducts" :fields="fields">

            <template slot="image" slot-scope="data">
                <b-img-lazy width="100%" thumbnail fluid :src="`https://firebasestorage.googleapis.com/v0/b/taison-exam.appspot.com/o/image_folder%2F${data.item.image}?alt=media`" :alt="data.item.image"></b-img-lazy>
            </template>

            <template slot="action" slot-scope="data">
                <b-button variant="primary" @click="editProduct(data.item)">Edit</b-button>
                <b-button variant="danger" @click="deleteProduct(data.item)">Delete</b-button>
            </template>
        </b-table>
    </div>
</template>


<script>
    export default {
        data(){
            return {
                fields:[
                    {
                        key:'digitCode',
                        sortable:true
                    },
                    {
                        key:'image',
                        sortable:true
                    },
                    {
                        key:'name',
                        sortable:true
                    },
                    {
                        key:'price',
                        sortable:true
                    },
                    {
                        key:'quantity',
                        sortable:true
                    },
                    {
                        key:'action'
                    }
                ]
            }
        },
        computed:{
            loadedProducts(){
                return this.$store.getters.loadedProducts
            }
        },
        methods:{
            deleteProduct(product){
                if(confirm(`Are you sure you want to delete ${product.name}?`)) {
                    this.$store.dispatch('deleteProduct',product.id)
                }
            },
            editProduct(product){
                this.$root.$emit('editProduct',product)
                this.$router.push(`/admin/${product.id}`)
            }
        }
    }
</script>

