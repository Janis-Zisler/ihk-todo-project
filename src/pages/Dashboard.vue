<template class="dashboard">
    <v-card>
        <v-container>
            <v-row class="justify-space-between">
                <v-col
                    cols="12"
                    xs="12"
                    sm="6"
                    md="4"
                    lgAndUp="2"
                >
                    <v-btn 
                        prepend-icon="mdi-plus"
                        color="info"
                        size="large"
                        @click="showNewTask = true"
                        block
                    >
                        Add Task
                    </v-btn>
                </v-col>
                <v-col 
                    cols="12"
                    xs="12"
                    sm="6"
                    md="4"
                    lgAndUp="2"
                >
                    <v-select 
                        label="" 
                        :items="filters" 
                        v-model="selectedFilter"
                        density="compact"
                        bg-color="info"
                        rounded="true"
                        hide-details
                    >
                    </v-select>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col>
                    <v-list>
                        <v-list-item v-if="showNewTask" class="border-md border-opacity-25 border-info border-dashed rounded ma-1">
                            <NewTask @close="showNewTask = false" />
                        </v-list-item>
                        
                        <TaskItem 
                            v-for="task in taskStore.filteredTasks(selectedFilter)"
                            :key="task.id"
                            :task="task"
                        />
                    </v-list>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
import { useTaskStore } from '@/store/task';
import { ref, onMounted } from 'vue';
import NewTask from '@/components/NewTask.vue';
import TaskItem from '@/components/TaskItem.vue';

const taskStore = useTaskStore();
const filters = ref(['All', 'Ongoing', 'Completed']);
const selectedFilter = ref('All');
const showNewTask = ref(false);

//
onMounted(async () => {
  await taskStore.fetchTasks();
})
</script>

