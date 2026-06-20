<template>
    <v-navigation-drawer
        v-model="drawerVisible"
        temporary
    >
        <v-list-item
            v-if="userStore.isSignedIn"
            prepend-icon="mdi-account-circle"
            :title="userStore.user.email"
        ></v-list-item>

        <v-divider />

        <v-list density="compact" nav>
            <v-list-item 
                v-if="userStore.isSignedIn"
                prepend-icon="mdi-view-dashboard" 
                title="Home" 
                router to="/"
            ></v-list-item>
            <!-- <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item> -->
            <v-list-item
                v-if="userStore.isSignedIn"
                prepend-icon="mdi-logout" 
                title="Logout" 
                @click="userStore.signOut"
            ></v-list-item>
            <v-list-item 
                v-else
                prepend-icon="mdi-login" 
                title="Login" 
                to="/auth"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup>
import { defineModel } from 'vue';
import { useUserStore } from '@/store/user.js';
const userStore = useUserStore();

const drawerVisible = defineModel();
</script>