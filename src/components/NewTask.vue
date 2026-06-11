<template>
    <v-text-field
        color="success"
        :disabled="false"
        :loading="false"
        v-model="newTodoTask"
        @keyup.enter="addTask"
    >
        <template #prepend>
            <v-icon 
                color="green"
                @click="addTask"
            > mdi-plus-box-outline </v-icon>
        </template>

        <template #append>
            <v-btn 
                icon="mdi-minus-circle-outline"
                color="error"
                variant="text"
                @click=" emit('close')"
            />
        </template>
    </v-text-field>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useTaskStore } from '@/store/task.js'

const emit = defineEmits(['close'])
const taskStore = useTaskStore()
const newTodoTask = ref('')

const addTask = () => {
    taskStore.addTask(newTodoTask.value);
    newTodoTask.value = '';
    emit('close');
}


</script>