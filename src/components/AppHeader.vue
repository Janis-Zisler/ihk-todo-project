<template>
    <v-app-bar color="">
      <template v-slot:prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>
        <span class="font-weight-thin text-grey">Ironhack FE:</span>
        <span class="font-weight-black mx-1">Todo</span>
        <span class="font-weight-light text-grey">Project</span>
      </v-app-bar-title>

      <template v-slot:append>
        
          <v-switch
            v-model="theme"
            :label="``"
            size="x-large"
            hide-details

            false-value="light"
            false-icon="mdi-weather-sunny"

            true-value="dark"
            true-icon="mdi-weather-night"
            
            :indeterminate=" theme === 'system' ? true : false"
            indeterminate-icon="mdi-theme-light-dark"

            class="mx-4"
          />
        <v-btn

        <v-btn 
          v-if="userStore.isSignedIn"
          @click="userStore.signOut"
          append-icon="mdi-logout"
          color="grey-darken-3"
          class="bg-red opacity-50"
        > Logout
          <template v-slot:append>
            <v-icon color="grey-darken-3"></v-icon>
          </template>
        </v-btn>

        
      </template>
    </v-app-bar>
</template>

<script setup>
import { watch, onMounted,  } from 'vue'
import { useTheme } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user.js'

const userStore = useUserStore();
const vuetifyTheme = useTheme();
const { user, theme } = storeToRefs(userStore);

// Watch for theme changes and apply to Vuetify
watch(theme, (newTheme) => {
  vuetifyTheme.change(newTheme);
});

onMounted(async () => {
  try {
    // Apply saved theme on mount
    vuetifyTheme.change(userStore.theme);
    
  } catch (e) {
    console.log(e.message);
  }
});
</script>