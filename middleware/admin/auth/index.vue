<template>
  <section class="container">
      <div class="container--outer">
            <div class="container--inner">
                <div class="container--form">
                    <transition name="fade" mode="out-in">
                        <div class="container--form--login" v-if="loginForm" key="login">
                            <h1 class="title">
                                Login
                            </h1>
                            <b-form-group id="input-group">
                                <b-form-input id="email" type="email" v-model="email" placeholder="Email"></b-form-input>
                                <br>
                                <b-form-input id="password" type="password" v-model="password" placeholder="Password"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="container--form--register" v-else key="register">
                            <h1 class="title">
                                Register
                            </h1>
                            <b-form-group id="input-group">
                                <b-form-input id="email" type="email" v-model="email" placeholder="Email"></b-form-input>
                                <br>
                                <b-form-input id="password" type="password" v-model="password" placeholder="Password"></b-form-input>
                            </b-form-group>
                        </div>
                    </transition>
                </div>
                <div class="switch-container">
                    <label class="switch"><input type="checkbox" id="togBtn" v-model="loginForm"><div class="slider round"></div></label>
                    &nbsp;
                    <p>{{loginForm ? 'not registered?' : 'Have a account?' }}</p>
                </div>
            </div>
      </div>
  </section>
</template>

<script>

export default {
    data(){
        return {
            email:'',
            password:'',
            loginForm:true
        }
    }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}

.container--outer{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}

.container--inner{
    width:400px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 70px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

/* switch element */
 .switch-container{
    display:flex;
    align-content:center;
  }

  /* SWITCH */

.switch {
  position: relative;
  display: inline-block;
  width: 55px;
  height: 27px;
}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #4E4E4E;
  -webkit-transition: .4s;
  transition: .4s;
   border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4E4E4E;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(28px);
}

</style>
