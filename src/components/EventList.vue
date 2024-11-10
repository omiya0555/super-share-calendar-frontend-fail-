<template>
    <div class="events ml-8 mr-4 p-4  flex-grow border">
        <p>Events</p>
        <div v-for="event in events" :key="event.id">
            <p class="p-2 hover:shadow-md transition">{{ event.title }}</p>
        </div>
        <hr class="mt-4">
    </div>
</template>

<script>
export default {
    props: ['events']
}
</script>

<style scoped>
.mt-6 {
    margin-top: 1.5rem;
}
</style>