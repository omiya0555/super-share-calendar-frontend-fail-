<template>
  <transition
    enter-active-class="transform transition-transform duration-500 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition-transform duration-500 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
    mode="out-in"
  >
    <div id="app" class="flex flex-col min-h-screen">
      <NavBar />
      <main class="flex-grow">
        <router-view />
      </main>
      <AppFooter />
    </div>
  </transition>

</template>

<script>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('auth_token'),
    };
  },
  components:{
    NavBar,
    AppFooter,
  },
  watch: {
    isAuthenticated(newValue) {
      if (!newValue && this.$route.name !== 'Login') {
        this.$router.push('/login');
      }
    },
  },
  created() {
    if (!this.isAuthenticated && this.$route.name !== 'Login') {
      this.$router.push('/login');
    }
  },
  methods: {
    checkAuth() {
      this.isAuthenticated = !!localStorage.getItem('auth_token');
    },
  },
};
</script>