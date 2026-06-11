<template>
    <v-list-item>
        <template #prepend>
            <v-checkbox
                v-model="task.is_complete"
                hide-details
                color="primary"
            />
        </template>

        <v-list-item-title :class="task.is_complete ? 'text-decoration-line-through' : ''">
            {{ task.task }}
        </v-list-item-title>

        <v-list-item-subtitle>
            {{ task.inserted_at }}
        </v-list-item-subtitle>

        <template #append>
            <v-btn
                icon="mdi-delete-circle-outline"
                variant="text"
                color="error"
                size="small"
                @click="taskStore.deleteTask(task.id)"
            />
        </template>
    </v-list-item>
</template>

<script setup>
import { useTaskStore } from '@/store/task.js'
import { defineProps } from 'vue'

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const taskStore = useTaskStore();
</script>