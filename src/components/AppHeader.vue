<template>
    <v-app-bar 
      color="" 
      class="px-4" 
      rounded="true"
    >
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title class="text-center">
        <span class="font-weight-thin text-grey text-title-medium" v-if="smAndUp">Ironhack FE:</span>
        <span class="font-weight-black mx-1 text-title-large">Todo</span>
        <span class="font-weight-light text-grey text-title-medium">Project</span>
      </v-app-bar-title>

      <template #append>
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
          v-if="userStore.isSignedIn"
          @click="userStore.signOut"
          :append-icon=" smAndUp ? 'mdi-logout' : null"
          color="grey-darken-3"
          class="bg-error opacity-50"
        > 
          {{ smAndUp ? "Logout" : "" }}
          <v-icon v-if="xs" color="grey-darken-3">mdi-logout</v-icon>
        </v-btn>
        <v-btn 
          v-else
          @click="ruter.push({ path: '/auth' })"
          :append-icon="smAndUp ? 'mdi-login' : null"
          color="grey-darken-3"
          class="bg-success opacity-50"
        > 
          {{ smAndUp ? "Login" : "" }}
          <v-icon v-if="xs" color="grey-darken-3">mdi-login</v-icon>
        </v-btn>
        
      </template>
    </v-app-bar>
</template>

<script setup>
import { watch, onMounted,  } from 'vue'
import { useDisplay, useTheme } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user.js'
import { useRouter } from 'vue-router'

const userStore = useUserStore();
const vuetifyTheme = useTheme();
const { user, theme } = storeToRefs(userStore);
const ruter = useRouter();

const display = useDisplay();
const { smAndUp, xs } = display;
// Watch for theme changes and apply to Vuetify
watch(theme, (newTheme) => {
  vuetifyTheme.change(newTheme);
});

onMounted(async () => {
  try { // Apply saved theme on mount
    vuetifyTheme.change(userStore.theme);
  } catch (e) {
    console.log(e.message);
  }
});
</script>