<template>
    <footer class="text-white inset-x-0 bottom-0 bg-gray-900 h-24 p-8 flex flex-col md:flex-row justify-between items-center">
        <!-- 左：コピーライト -->
        <div class="text-center md:text-left">
            <p>&copy; 2024 SSC. All rights reserved.</p>
        </div>

        <!-- 中央：ナビゲーションリンク -->
        <div class="hidden md:flex space-x-4">
            <router-link to="/" class="hover:text-blue-300">ホーム</router-link>
            <router-link to="/about" class="hover:text-blue-300">会社情報</router-link>
            <router-link to="/privacy" class="hover:text-blue-300">プライバシーポリシー</router-link>
            <router-link to="/contact" class="hover:text-blue-300">お問い合わせ</router-link>
        </div>

        <!-- 右：SNSアイコン -->
        <div class="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" class="hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M22 4.59a8.38 8.38 0 01-2.36.65 4.2 4.2 0 001.85-2.32 8.31 8.31 0 01-2.6 1 4.17 4.17 0 00-7.1 3.8 11.82 11.82 0 01-8.6-4.35 4.17 4.17 0 001.29 5.57 4.13 4.13 0 01-1.88-.52v.05a4.18 4.18 0 003.34 4.1 4.17 4.17 0 01-1.88.07 4.18 4.18 0 003.9 2.89A8.38 8.38 0 012 19.54a11.8 11.8 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.34 8.34 0 0022 4.59z" />
                </svg>
            </a>
            <a href="https://facebook.com" target="_blank" class="hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
            </a>
            <a href="https://instagram.com" target="_blank" class="hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10v10H7V7zm10.83-4H6.17A2.17 2.17 0 004 5.17v12.66A2.17 2.17 0 006.17 20h12.66A2.17 2.17 0 0021 17.83V5.17A2.17 2.17 0 0018.83 3zM16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            </a>
        </div>
    </footer>
</template>

<script>
export default {
    name: "AppFooter",
};
</script>

<style scoped>
/* フッタースタイルの追加が必要な場合に使用 */
</style>
