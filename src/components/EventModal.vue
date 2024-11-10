<template>
    <div class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" @click.self="close">
        <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button v-if="isEdit" @click="confirmDelete" class="absolute top-0 right-0 mt-2 mr-2 text-red-500">
                削除
            </button>
            <h3 class="text-xl font-semibold mb-4">{{ isEdit ? 'イベント編集' : '新規イベント作成' }}</h3>

            <form @submit.prevent="submitForm">
                <label class="text-gray-800 text-sm">タイトル</label>
                <input v-model="eventData.title" placeholder="イベントタイトル" required
                    class="w-full p-2 mb-4 border rounded" />

                <label class="text-gray-800 text-sm mb-2 block">参加者</label>
                <div class="w-full p-2 mb-4 border rounded flex flex-wrap gap-2">
                    <div v-for="user in users" :key="user.id" class="flex items-center">
                        <input type="checkbox" :id="'user-' + user.id" :value="user.id"
                            v-model="selectedParticipants" class="mr-2" />
                        <label :for="'user-' + user.id" class="text-sm mr-4">{{ user.name }}</label>
                    </div>
                </div>

                <label class="text-gray-800 text-sm">期間</label>
                <div class="flex gap-2">
                    <input type="datetime-local" v-model="eventData.start" required
                        class="w-full p-2 mb-4 border rounded" />
                    <span class="my-auto">～</span>
                    <input type="datetime-local" v-model="eventData.end" required
                        class="w-full p-2 mb-4 border rounded" />
                </div>

                <div class="flex justify-between mt-4">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">保存</button>
                    <button type="button" @click="close"
                        class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">キャンセル</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import apiClient from "../plugins/axios";
export default {
    props: {
        event: Object,
        existingEvents: Array,
    },
    data() {
        return {
            eventData: { ...this.event }, // 既存のイベントデータをコピー
            users: [], // ユーザー情報
            selectedParticipants: [], // 選択された参加者
        };
    },
    computed: {
        isEdit() {
            return !!this.event.id;
        },
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await apiClient.get("http://localhost/api/users");
                this.users = response.data;
            } catch (error) {
                console.error("ユーザー情報の取得に失敗しました", error);
            }
        },
        submitForm() {
            this.eventData.participants = this.selectedParticipants.map(userId => ({ user_id: userId }));
            this.$emit('save', this.eventData);
        },
        close() {
            this.$emit("close");
        },
        confirmDelete() {
            if (confirm('このイベントを削除してよろしいですか？')) {
                this.$emit('delete', this.eventData);
            }
        }
    },
};
</script>

<style scoped>
/* モーダルのスタイル */
</style>