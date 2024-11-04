<template>

    <div class="flex justify-evenly mt-10">
        <div class="events ml-8 mr-4 p-4  flex-grow border">
            <p>Events</p>
            <div v-for="event in events" :key="event.id">
                <p class="p-2 hover:shadow-md transition">{{ event.title }}</p>
            </div>
            <hr class="mt-4">
            <p class="mt-8">Filters</p>
            <div>
                <div class="flex">
                    <label for="filter1" class="p-2">test</label>
                    <input id="filter1" type="checkbox" class="mr-4">

                    <label for="filter2" class="p-2">test</label>
                    <input id="filter2" type="checkbox" class="mr-4">
                    
                    <label for="filter3" class="p-2">test</label>
                    <input id="filter3" type="checkbox" class="mr-4">
                    
                    <label for="filter4" class="p-2">test</label>
                    <input id="filter4" type="checkbox">
                </div>
                <button type="submit" 
                    class="w-full h-8 border-gray-900 bg-gray-400 hover:bg-gray-600 transition">
                    検索
                </button>
            </div>
            <hr class="mt-8">
        </div>
        <FullCalendar ref="fullCalendar" :options="calendarOptions" @dateClick="handleDateClick" @eventClick="handleEventClick"
            class="w-1/2 ml-4 mr-8 p-8 border"/> 
    </div>

    <!-- イベント作成・編集モーダル -->
    <EventModal
        v-if="showEventModal"
        :event="selectedEvent"
        :existingEvents="events"
        @close="showEventModal = false"
        @save="saveEvent"
        @delete="deleteEvent"
    />
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import apiClient from "../plugins/axios";
import EventModal from "./EventModal.vue";

export default {
    components: {
        FullCalendar,
        EventModal,
    },
    data() {
        return {
            events: [], // イベントリスト
            selectedEvent: null, // 選択されたイベント
            showEventModal: false, // イベントモーダルの表示状態
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: "dayGridMonth",
                locale: jaLocale,
                headerToolbar: {
                    start: "prev,next",
                    center: "title",
                    end: "dayGridMonth,dayGridWeek",
                },
                selectable: true,
                contentHeight: 550,
                events: this.fetchEvents,
                dateClick: this.handleDateClick,
                eventClick: this.handleEventClick,
            },
        };
    },
    methods: {
        async fetchEvents(fetchInfo, successCallback, failureCallback) {
            try {
                const response = await apiClient.get("http://localhost/api/events");
                const events = response.data.map((event) => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.start_time).toISOString(),
                    end: new Date(event.end_time).toISOString(),
                    allDay: event.all_day || false,
                }));
                successCallback(events);
            } catch (error) {
                failureCallback(error);
            }
        },

        async updateEvents() {
            try {
                const calendarApi = this.$refs.fullCalendar.getApi();
                const view = calendarApi.view;
                const fetchInfo = {
                    start: view.activeStart,
                    end: view.activeEnd,
                };
                this.fetchEvents(
                    fetchInfo,
                    (events) => {
                        this.events = events;
                        calendarApi.refetchEvents();
                    },
                    (error) => {
                        console.error("Error fetching events:", error);
                    }
                );
            } catch (error) {
                console.error("Error updating events:", error);
            }
        },

        handleDateClick(dateInfo) {
            const dateClicked = dateInfo.dateStr;
            this.selectedEvent = {
                start: `${dateClicked}T08:00`,
                end: `${dateClicked}T09:00`,
                title: "",
                participants: [],
            };
            this.showEventModal = true;
        },

        handleEventClick(eventInfo) {
            const event = eventInfo.event;
            this.selectedEvent = {
                id: event.id,
                title: event.title,
                start: new Date(event.start).toISOString().substring(0, 16),
                end: new Date(event.end).toISOString().substring(0, 16),
                participants: event.extendedProps.participants,
            };
            this.showEventModal = true;
        },

        saveEvent(eventData) {
            if (eventData.id) {
                this.updateEvent(eventData);
            } else {
                this.createEvent(eventData);
            }
        },

        async createEvent(eventData) {
            try {
                const formattedData = {
                    title: eventData.title,
                    start_time: eventData.start,
                    end_time: eventData.end,
                    participants: eventData.participants || [],
                };
                await apiClient.post("http://localhost/api/events", formattedData);
                alert("イベントが追加されました！");
                this.showEventModal = false;
                this.updateEvents();
            } catch (error) {
                console.error("Error creating event:", error);
            }
        },

        async updateEvent(eventData) {
            try {
                await apiClient.put(`http://localhost/api/events/${eventData.id}`);
                alert("イベントが更新されました！");
                this.showEventModal = false;
                this.updateEvents();
            } catch (error) {
                console.error("Error updating event:", error);
            }
        },

        deleteEvent(eventData) {
            if (!eventData.id) return;
            apiClient.delete(`http://localhost/api/events/${eventData.id}`)
                .then(() => {
                    alert("イベントが削除されました");
                    this.showEventModal = false;
                    this.updateEvents();
                })
                .catch(error => {
                    console.error("Error deleting event:", error);
                });
        },
    },
    mounted() {
        this.updateEvents();
    },
};
</script>

<style scoped>
.mt-6 {
    margin-top: 1.5rem;
}
</style>
