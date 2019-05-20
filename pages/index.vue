<template>
  <section class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">
        Taison Exam
      </h1>
      <h2 class="subtitle">
        Taison Examination for front-end developer
      </h2>
     <nuxt-link to="/admin/auth"><b-button>Login</b-button></nuxt-link>
     <!-- <nuxt-link to="/main"><b-button>Main page</b-button></nuxt-link> -->
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  layout:'admin',
  components: {
    Logo
  }
}
</script>

<style>
.container {
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
</style>
