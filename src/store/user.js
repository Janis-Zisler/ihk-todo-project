// /store/user.js

import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import router from '@/router';
import { useTheme } from 'vuetify'
import { useTaskStore } from './task';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    theme: 'system', // Theme Colors: ./node_modules/vuetify/lib/composables/theme.js
    rules: {
      required: value => !!value || 'Field is required',
      email: value => /^[\w.+-]+@[\w-]+(?:\.[\w-]{2,})+$/.test(value) || 'Email is invalid',
      passwordMatch: (value, other) => value === other || 'Passwords do not match',
      passwordLength: value => value.length >= 6 || 'Password must be at least 6 characters long'
    },
  }),

  // Actions
  actions: {
    // User actions
    async fetchUser () { // Fetch user data
      const user = await supabase.auth.getUser();
      this.user = user.data.user;
    },
    async signUp (email, password) { // Sign up
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (data) this.user = data.user;
    },
    async signIn (email, password,targetPage = '/') { // Sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      
      if (error) throw error;
      if (data) this.user = data.user;

      router.push(targetPage);
    },
    async signOut () { // Sign out
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.reset();
      router.push('/auth');
    },

    // Theme actions
    setTheme (newTheme = null) {
       switch(newTheme) {
        case 'light':
        case 'dark':
            this.theme = newTheme;
            break;
        case null:
        default:
              this.theme = this.theme === 'light' ? 'dark' : 'light';
       }
    },
    reset() { // Reset all user data
      this.user = null;
      this.theme = 'system';
      useTaskStore().reset(); // Reset tasks
    },
  
    //persist: true, 
    persist:{
      key: 'userStore',
      storage: localStorage,
      pick: ['user', 'theme'],
      debug: true,
    }, 
 },
 getters: {
    isSignedIn: (state) => state.user === null ? false : true,
    getTheme: (state) => state.theme
  }
});
