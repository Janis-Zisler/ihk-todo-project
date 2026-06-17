<template>
    <v-list-item>
        <template #prepend>
            <v-checkbox
                v-model="currentTask.is_complete"
                hide-details
                color="success"
                @click="updateTask"
            />
        </template>

        <v-list-item-title 
            v-if="!showUpdateTask"
            :class="currentTask.is_complete ? 'text-decoration-line-through' : ''
        ">
            {{ currentTask.task }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="!showUpdateTask">
            {{ currentTask.inserted_at }}
        </v-list-item-subtitle>

        <template v-if="showUpdateTask">
            <v-text-field
                v-model="updatedTaskMsg"
                @keyup.enter="updateTask"
            />
        </template>

        <template #append>
            <template v-if="!showUpdateTask">
                <v-btn
                    icon="mdi-delete-circle-outline"
                    variant="text"
                    color="error"
                    size="small"
                    @click="deleteTask(taskID)"
                />
                <v-btn
                    icon="mdi-pencil-circle-outline"
                    variant="text"
                    color="warning"
                    size="small"
                    @click="showUpdateTask = true"
                />
            </template>
            <template v-else>
                <v-btn
                    icon="mdi-check-circle-outline"
                    variant="text"
                    color="success"
                    size="small"
                    @click="updateTask"
                />
                <v-btn
                    icon="mdi-close-circle-outline"
                    variant="text"
                    color="error"
                    size="small"
                    @click="showUpdateTask = false"
                />
            </template>
        </template>
        
        

        
            
        
    </v-list-item>
</template>

<script setup>
import { useTaskStore } from '@/store/task.js'
import { useErrorStore } from '@/store/error.js'
import { defineProps, ref, reactive } from 'vue'

const props = defineProps({
    taskID: {
        type: Number || String,
        required: true
    }
});

const taskStore = useTaskStore();
const errorStore = useErrorStore();

const currentTask = reactive( taskStore.getTaskById(props.taskID) );
const showUpdateTask = ref(false);
const updatedTaskMsg = ref(currentTask.task);

console.log("Current Task:", currentTask);


const updateTask = async () => {
    try {
        if(currentTask.task !== updatedTaskMsg.value) {
            await taskStore.updateTask(currentTask.id, updatedTaskMsg.value);
        } else {
            await taskStore.updateTask(currentTask.id); 
        }
        updatedTaskMsg.value = currentTask.task;
        showUpdateTask.value = false;
    } catch (error) {
        console.log("There was an Error in updateTask:", error.message);
        errorStore.addNewError( { message: error.message || 'Failed to update task. Please try again.' } );
    }
}

const deleteTask = async (taskId) => {
    try {
        await taskStore.deleteTask(taskId);
    } catch (error) {
        console.log("There was an Error in deleteTask:", error);
        errorStore.addNewError( { message: error.message || 'Failed to delete task. Please try again.' } );
    }
}

</script>