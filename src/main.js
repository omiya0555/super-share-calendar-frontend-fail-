import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from './plugins/axios';
import './assets/tailwind.css'; 

// トークンの有効期限を確認
const token     = localStorage.getItem('auth_token');
const expiresAt = localStorage.getItem('expires_at');

if (token && expiresAt) {
    const now = new Date();
    if (new Date(expiresAt) > now) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // 有効期限切れの場合、トークンを削除
        localStorage.removeItem('auth_token');
        localStorage.removeItem('expires_at');
    }
}

createApp(App)
    .use(router)
    .provide('axios', axios)
    .mount('#app');
