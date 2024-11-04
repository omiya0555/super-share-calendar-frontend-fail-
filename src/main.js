import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from './plugins/axios';
import './assets/tailwind.css'; 

createApp(App)
    .use(router)
    .provide('axios', axios)
    .mount('#app');
