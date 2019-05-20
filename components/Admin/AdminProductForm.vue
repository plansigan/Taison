<template>
    <form @submit.prevent="onSave">
        <br>
        <b-input-group prepend="Name">
            <b-form-input v-model="editedProduct.name" type="text" placeholder="Jordan Schlansky" required></b-form-input>
        </b-input-group>
        <br>
        <b-input-group prepend="Digit code">
            <b-form-input v-model="editedProduct.digitCode" type="number" placeholder="9999" max="9999" required></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
            <b-form-file v-model="image" class="mt-3" accept=".jpg, .png, .gif"></b-form-file>
        </b-input-group>
        <p class="mt-2">Uploaded file: <b>{{ typeof image == 'object' ? imageUploaded ? image.name :'click upload to upload selected file' : image }}</b></p>
        <br>
        <b-progress v-show="counter < 100" :value="counter" :max="max" show-progress animated></b-progress>
        <b-progress v-show="counter == 100" :value="counter" variant="success" :max="max" show-progress></b-progress>
        <br> 
        <b-button @click="uploadImage">Upload Image</b-button>
        
        <br> 
        <b-input-group style="margin-top:10px;">
            <b-alert v-show="imageUploaded == false" show variant="danger">Please upload an image!!</b-alert>
        </b-input-group>
        <br>
        <b-input-group prepend="PHP">
            <b-form-input v-model="editedProduct.price" type="number" placeholder="300.00" required></b-form-input>
        </b-input-group>
        <br>
        <b-input-group prepend="Quantity" append="/pcs">
            <b-form-input v-model="editedProduct.quantity" type="number" required></b-form-input >
        </b-input-group>
    <br>    
        <b-button type="submit" variant="primary">Save</b-button>
    </form>
</template>

<script>

    export default {
        props:{
            product:{
                type:Object,
                required:false
            },
            edit:{
                type:Boolean,
                required:false
            }
        },
        data(){
            return {
                editedProduct:this.product ? {...this.product} : {},
                image:this.product ? this.product.image: null,
                imageUploaded:null,
                imageAdded:null,
                max: 100
            }
        },
        computed:{
            counter(){
                return this.$store.getters.uploadCounter
            },
            loadedProducts(){
                return this.$store.getters.loadedProducts
            }
        },
        methods:{
            onSave(){

                function checkDigitCodeifExist(arr, value,name,edit) {
                    if(edit) {
                        const { length } = arr;
                        const id = length + 1;
                        const found = arr.some(el => el.digitCode === value && el.name === name);
                        if (!found) {
                            return true
                        } else {
                            return false
                        } 
                    } else {
                        const { length } = arr;
                        const id = length + 1;
                        const found = arr.some(el => el.digitCode === value);
                        if (!found) {
                            return true
                        } else {
                            return false
                        } 
                    }
                }

                if(this.edit) {
                    if(checkDigitCodeifExist(this.loadedProducts,this.editedProduct.digitCode,this.editedProduct.name,true)) {
                        this.$emit('submit',{...this.editedProduct})
                    }  else if (this.counter <= 99 && this.counter >= 1) {
                        alert('please wait for the image to be uploaded')
                    }  else if (!checkDigitCodeifExist(this.loadedProducts,this.editedProduct.digitCode,this.editedProduct.name,true)) {
                        alert('Digit code already exist!')
                    }
                } else {
                    if(this.imageUploaded == true && this.counter >= '100' && checkDigitCodeifExist(this.loadedProducts,this.editedProduct.digitCode)) {
                        this.$emit('submit',{...this.editedProduct,image:this.image.name})
                    }  else if (this.counter <= 99 && this.counter >= 1) {
                        alert('please wait for the image to be uploaded')
                    }  else if (!checkDigitCodeifExist(this.loadedProducts,this.editedProduct.digitCode)) {
                        alert('Digit code already exist!')
                    } else {
                        this.imageUploaded = false
                    }
                }
            },
            onCancel(){
                // Navigate Back
                this.$router.push('/main')
            },
            uploadImage(){
                if(this.image !== null) {
                    this.$store.dispatch('uploadImage',this.image)
                    .then(()=>{
                        this.imageUploaded = true
                    })
                } 
            }
        }
    }
</script>