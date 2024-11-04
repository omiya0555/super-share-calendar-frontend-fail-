<template>
    <div>
        <h1>ホーム</h1>
        <button @click="logout">ログアウト</button>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('authToken');
            this.$router.push('/login');
        },
    },
};
</script>