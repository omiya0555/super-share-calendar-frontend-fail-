<template>
    <BaseLayout>
        <div class="home-container p-6">
            <h1 class="w-fit text-2xl font-semibold mx-auto mb-6">ホーム</h1>
            <!-- カレンダーとその日のイベント一覧 -->
            <div>
                <!-- カレンダーコンポーネント -->
                <CalendarEvent />
            </div>
        </div>
    </BaseLayout>
</template>

<script>
import CalendarEvent from '@/components/CalendarEvent.vue';
import BaseLayout from '../layouts/BaseLayout.vue';

export default {
    components: {
        CalendarEvent,
        BaseLayout,
    },
};
</script>

<style scoped>

</style>