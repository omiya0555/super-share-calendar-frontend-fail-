<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('authToken'),
    };
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
      this.isAuthenticated = !!localStorage.getItem('authToken');
    },
  },
};
</script>