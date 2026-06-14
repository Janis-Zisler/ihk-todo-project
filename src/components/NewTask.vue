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

const emit = defineEmits(['close'])
const taskStore = useTaskStore()
const newTodoTask = ref('')
const isLoading = ref(false)

const errorObj = reactive({
    showError: false,
    errorMessage: '',
});

const addTask = async () => {
    isLoading.value = true

    try {
        await taskStore.addTask(newTodoTask.value);
        newTodoTask.value = '';
    } catch (error) {
        console.log(error);
        errorObj.errorMessage = error.message || 'Failed to add task. Please try again.';
        errorObj.showError = true;
    }
    
    isLoading.value = false
    emit('close');
}


</script>