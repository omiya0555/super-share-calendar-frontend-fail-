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
import apiClient from "../plugins/axios";
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: "",
        };
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        async login() {
            try {
                const response = await apiClient.post("http://localhost/api/login", {
                    email: this.email,
                    password: this.password,
                });

                // 認証情報を保存
                const token = response.data.token;
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 1);
                
                // トークンと有効期限を保存
                localStorage.setItem('auth_token', token);
                localStorage.setItem('expires_at', expiresAt.toISOString());

                // リダイレクト
                this.router.push('/').then(() => {
                    window.location.reload(); // 状態を強制的に再描画させる
                });

            } catch (error) {
                this.errorMessage = "ログインに失敗しました";
            }
        },
    },
};
</script>