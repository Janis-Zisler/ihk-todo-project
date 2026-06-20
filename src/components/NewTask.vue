<template>
    <v-text-field
        color="success"
        :disabled="isLoading"
        :loading="isLoading"
        append-inner-icon="mdi-plus-circle-outline"
        @click:append-inner="addTask"
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
import { ref, reactive } from 'vue'
import { useTaskStore } from '@/store/task.js'
import { useErrorStore } from '@/store/error.js'

const emit = defineEmits(['close'])
const errorStore = useErrorStore();
const taskStore = useTaskStore()
const newTodoTask = ref('')
const isLoading = ref(false)

const errorObj = reactive({
    message: '',
});

const addTask = async () => {
    isLoading.value = true

    try {
        await taskStore.addTask(newTodoTask.value);
        newTodoTask.value = '';
        isLoading.value = false
        emit('close');
    } catch (_error) {
        //errorObj.message = _error.message || 'Failed to add task. Please try again.';
        errorObj.message = 'Failed to add task. Please try again. (min 4 characters)';
        errorStore.addNewError(errorObj);
        isLoading.value = false
    }
}
</script>