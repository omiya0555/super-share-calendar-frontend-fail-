<template>
    <BaseLayout>
        <div class="home-container p-6">
            <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">通知一覧</h1>
            <!-- 通知一覧 -->
            <div>
                <!-- 通知リストコンポーネント -->
                <AppNotificationList 
                    :notifications="notifications"
                    :currentChatRoomId="currentChatRoomId" 
                />
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import apiClient from "../plugins/axios";
import BaseLayout from '@/layouts/BaseLayout.vue';
import AppNotificationList from "@/components/AppNotificationList.vue";

export default {
    components :{
        BaseLayout,
        AppNotificationList
    },
    data() {
        return {
            notifications: [],
            currentUserId: parseInt(localStorage.getItem('user_id'), 10),
            loading: true,
        };
    },
    methods: {
        async fetchNotifications() {
            try {
                const response = await apiClient.get(`http://localhost/api/notifications/`);
                this.notifications = response.data;
                console.log(this.notifications);

            } catch (error) {
                console.error('通知の取得に失敗しました', error);
            }
        },
    },
    mounted() {
        this.fetchNotifications();
        this.loading = false;
    },
};
</script>

<style scoped>
</style>