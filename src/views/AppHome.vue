<template>
    <calendar-event></calendar-event>
</template>

<script>
import CalendarEvent from '@/components/CalendarEvent.vue';

export default {
    components: { CalendarEvent },
    methods: {
        logout() {
            if(confirm('ログアウトしますか？')){
                localStorage.removeItem('auth_token');
                this.$router.push('/login');
            }
        },
    },
};
</script>