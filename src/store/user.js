// /store/user.js

import { defineStore } from 'pinia';
import { supabase } from '../utils/supabase';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser () {
      const user = await supabase.auth.getUser();
      this.user = user.data.user;
    },
    async signUp (email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password
      });
      if (error) throw error;
      if (user) this.user = user.data.user;
    },
    async signIn (email, password) {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      
      if (error) throw error;
      if (user) this.user = user.data.user;
    },
    async signOut () {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
  
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    },
 }
});
