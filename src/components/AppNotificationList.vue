<template>
    <div class="justify-center rounded-md">
        <div    v-for="notification in localNotifications" :key="notification.id"
                class="shadow-none hover:shadow-md hover:border transition">
            <div v-if="!notification.read_at" class="bg-blue-100 py-2 px-4">{{ notification.title }}&emsp;{{ notification.content }}</div>
            <div v-else class="py-2 px-4 ">{{ notification.title }}&emsp;{{ notification.content }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notifications: Array,
        currentChatRoomId: Number,
    },
    data() {
        return {
            localNotifications: [...this.notifications],
        };
    },
    mounted() {
        // Echo インスタンスが存在するか確認
        if (!window.Echo) {
            console.error("Echo instance not found.");
            return;
        }

        // チャンネル名が正しいか確認
        const channelName = `private-group-chat.${this.currentChatRoomId || 1}`;
        console.log("Subscribing to channel:", channelName);

        window.Echo.private(channelName)
            .listen('.notification.sent', (event) => {
                this.localNotifications.push(event.notification);
                console.log('Notification received:', event.notification);
            })
            .error((error) => {
                console.error("Subscription error:", error);
            });
    },
    watch: {
        // notificationsが変更されたとき、localNotificationsも更新
        notifications(newNotifications) {
            this.localNotifications = [...newNotifications];
        }
    }
};
</script>

<style scoped>
.bg-blue-100 {
    background-color: #ebf8ff;
}
.font-semibold {
    font-weight: 600;
}
</style>
