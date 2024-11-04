<template>
    <div class="login">
        <h1>ログイン</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button type="submit">ログイン</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from "../plugins/axios";

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post("/login", {
                    email: this.email,
                    password: this.password,
                });
                localStorage.setItem("authToken", response.data.token);
                this.$router.push("/");
            } catch (error) {
                this.errorMessage = "ログインに失敗しました";
            }
        },
    },
};
</script>