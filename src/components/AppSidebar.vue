<template>
  <div class="sidebar bg-gray-800 text-white h-full flex flex-col p-4">
    <div class="sidebar-title font-bold text-lg mb-4">
      メニュー
    </div>
    <nav>
      <ul>
        <li v-for="item in menuItems" :key="item.name" class="mb-2">
          <router-link :to="item.route" class="flex items-center p-2 rounded-md hover:bg-gray-700">
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  props: {
    menuItems: {
      type: Array,
      default: () => [
        { name: 'ホーム', route: '/' },
        { name: 'イベント', route: '/events' },
        { name: 'チャット', route: '/chat'},
        { name: '通知', route: '/notifications' },
        { name: 'プロフィール', route: '/profile'},
      ]
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 240px;
}
</style>
