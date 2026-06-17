// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    isLoading: false,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async addTask(taskMsg) { // Insert the new task into the database
      console.log("Adding task:", taskMsg);
      
      const { data, error } = await supabase
        .from("todos")
        .insert({ 
          user_id: useUserStore().user.id,
          task: taskMsg, 
          is_complete: false })
        .select()

      if (error) console.log("Adding task error:", error);
      if (error) throw error;
      if (data) console.log( "Adding task data:", data);
      if (data) this.tasks.unshift(data[0]);

    },
    async updateTask(id, taskMsg = null) { // Update the task in the database
      console.log("Updating task:", taskMsg, id);

      const index = this.indexOfIdMap.get(id);
      console.log("Updating task index:", index);
      const { data, error } = await supabase
        .from("todos")
        .update({
          task: taskMsg || this.tasks[index].task, 
          is_complete: this.tasks[index].is_complete
        })
        .eq('id', id)
        .select();

      if (error) console.log("Updating task error:", error);
      if (error) throw error;
      if (data) console.log( "Updating task data:", data);
      if (data) this.tasks[index] = data[0];
    },
    async deleteTask(taskId) { // Delete the task from the database
      console.log("Deleting task:", taskId);
      const { data, error } = await supabase
        .from("todos")
        .delete()
        .eq('id', taskId)
        .select();

      if (error) console.log("Deleting task error:", error);
      if (error) throw error;

      const index = this.indexOfIdMap.get(taskId);
      if (data) console.log( "Deleting task data:", data, index);
      if (data) this.tasks.splice(index, 1);
    },
    reset() { // Reset tasks
      this.tasks = null;
      this.isLoading = false;
      console.log("Tasks reset");
    },

    getTaskById(id) { // Get task by id
      const index = this.indexOfIdMap.get(id);
      return this.tasks[index] || null;
    },
  },
  getters: {
    indexOfIdMap: (state) => {
      return new Map((state.tasks || []).map((task, index) => [task.id, index])); // 
    },
  },
});
