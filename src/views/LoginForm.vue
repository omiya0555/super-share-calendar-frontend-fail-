<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
            <h2 class="text-2xl font-bold mb-6 text-center">ログイン</h2>
            <form @submit.prevent="login">
                <input v-model="email" type="email" placeholder="Email" required
                    class="w-full p-3 mb-4 border rounded" />
                <input v-model="password" type="password" placeholder="Password" required
                    class="w-full p-3 mb-6 border rounded" />
                <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded">
                    ログイン
                </button>
            </form>
            <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
        </div>
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
                    email:      this.email,
                    password:   this.password,
                });

                // 認証情報を保存
                const userId = response.data.user.id;
                const token = response.data.token;
                const expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 24);

                // トークンと有効期限を保存
                localStorage.setItem('user_id',     userId );
                localStorage.setItem('auth_token',  token);
                localStorage.setItem('expires_at',  expiresAt.toISOString());

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