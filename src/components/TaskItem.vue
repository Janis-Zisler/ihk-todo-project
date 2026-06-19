<template>
    <v-list-item class="border-md border-opacity-25 border-info border-dashed rounded my-1">
        <template #prepend>
            <v-checkbox
                :model-value="currentTask.is_complete"
                hide-details
                color="success"
                @change="toggleComplete"
            />
        </template>

        <v-list-item-title 
            v-if="!updateTaskVisible"
            :class="currentTask.is_complete ? 'text-decoration-line-through' : '' "
            @dblclick="updateTaskVisible = true"
            @click="toggleComplete"
        >
            {{ currentTask.task }}
        </v-list-item-title>
        <v-list-item-subtitle v-if="!updateTaskVisible">
            {{ createdAt }}
        </v-list-item-subtitle>

        <template v-if="updateTaskVisible">
            <v-text-field
                v-model="newTaskMessage"
                @keyup.enter="updateTaskMessage"
                @keyup.esc="updateTaskVisible = false"
            />
        </template>

        <template #append>
            <template v-if="!updateTaskVisible">
                <v-btn
                    icon="mdi-delete-circle-outline"
                    variant="text"
                    color="error"
                    size="small"
                    @click="deleteTask"
                />
                <v-btn
                    icon="mdi-pencil-circle-outline"
                    variant="text"
                    color="warning"
                    size="small"
                    @click="updateTaskVisible = true"
                />
            </template>
            <template v-else>
                <v-btn
                    icon="mdi-check-circle-outline"
                    variant="text"
                    color="success"
                    size="small"
                    @click="updateTaskMessage"
                />
                <v-btn
                    icon="mdi-close-circle-outline"
                    variant="text"
                    color="error"
                    size="small"
                    @click="updateTaskVisible = false"
                />
            </template>
        </template>
    </v-list-item>
</template>

<script setup>
import { useTaskStore } from '@/store/task.js'
import { useErrorStore } from '@/store/error.js'
import { defineProps, ref, computed, watch } from 'vue'

const props = defineProps({
    task: { type: Object, required: true }
});
    
const taskStore = useTaskStore();
const errorStore = useErrorStore();

const currentTask = computed(() => props.task);

const updateTaskVisible = ref(false);
const newTaskMessage = ref(props.task.task);

const createdAt = computed(() => 
    new Date(props.task.inserted_at).toLocaleString()
);

watch(() => props.task.task, (val) => { newTaskMessage.value = val })

const updateTaskMessage = async () => {
    try {
        await taskStore.updateTask(
            currentTask.value.id, newTaskMessage.value, currentTask.value.is_complete
        );

        //newTaskMessage.value = currentTask.task;
        updateTaskVisible.value = false;
    } catch (error) {
        errorStore.addNewError( { 
            //message: error.message || 'Failed to update task. Please try again.' 
            message: 'Failed to update task. Please try again. (min 4 characters)'
        } );
    }
}

const toggleComplete = async () => {
  try {
    await taskStore.updateTask(currentTask.value.id, null, !currentTask.value.is_complete);
  } catch (error) {
    errorStore.addNewError({ 
        message: error.message || 'Failed to toggle complete.' 
    });
  }
}

const deleteTask = async () => {
    try {
        await taskStore.deleteTask(currentTask.value.id);
    } catch (error) {
        errorStore.addNewError( { 
            message: error.message || 'Failed to delete task. Please try again.' 
        } );
    }
}

</script>