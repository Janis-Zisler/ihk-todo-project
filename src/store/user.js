// /store/user.js

import { defineStore } from 'pinia';
import { supabase } from '@/utils/supabase';
import router from '@/router';
import { useTheme } from 'vuetify'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    theme: 'system',
  }),

  // Actions
  actions: {
    // User actions
    async fetchUser () {
      const user = await supabase.auth.getUser();
      this.user = user.data.user;
    },
    async signUp (email, password) {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (data) this.user = data.user;
    },
    async signIn (email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      
      if (error) throw error;
      if (data) this.user = data.user;
    },
    async signOut () {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
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
              this.theme = this.theme === 'light' ? 'dark' : 'light'
       }
    },
  
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        },
        {
          key: 'theme',
          storage: localStorage
        }
      ]
    },
 },
 getters: {
    isSignedIn: (state) => state.user === null ? false : true,
    getTheme: (state) => state.theme
  }
});
