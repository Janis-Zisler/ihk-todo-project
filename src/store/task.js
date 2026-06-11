// /store/task.js

import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";

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
      async addTask(task) {
        // Insert the new task into the database
        console.log("Adding task:", task);
      },
      async updateTask(task) {
        // Update the task in the database
        console.log("Updating task:", task);
      },
      async deleteTask(taskId) {
        // Delete the task from the database
        console.log("Deleting task:", taskId);
      }
  },
});
