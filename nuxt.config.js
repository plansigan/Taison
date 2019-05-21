const pkg = require('./package')

//expressJS
const bodyParser = require('body-parser');


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script:[
      {src:'https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.css',
    '~/assets/icofont.min.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~plugins/firebase.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseUrl:'https://taison-exam.firebaseio.com/',
    credentials:false
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },

  env:{
    fbAPIKey:'AIzaSyDCY2S7sKw2yS-mpYx8o6hMqtoAoqK-6_Q',
    baseURL:'https://taison-exam.firebaseio.com'
  },
  transition:{
    name:'fade',
    mode:'out-in'
  },

  //nodejs SERVER
  serverMiddleware:[
    bodyParser.json(),
    '~/api'
  ]
}
