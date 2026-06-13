<template>
  <v-app>
    <AppHeader />
    <v-divider :thickness="20" />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" md="10" lg="8" class="mx-auto">
            <router-view class="app-main" /> <!-- your routes will load inside of these tags -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'
import AppHeader from '@/components/AppHeader.vue';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser() // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: '/auth' });
    } else {
      // continue to dashboard
      router.push({ path: '/' });
    }
  } catch (e) {
    console.log(e.message);
  }
})

</script>
