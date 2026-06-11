<template>
    <v-card class="pa-5" color="" variant="elevated">
        <v-card-title class="text-h4 text-center">Sign In</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="signIn">
                <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                />
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                />
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn color="success" @click="signIn">Sign In</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()

const email = ref('');
const password = ref('');

const signIn = () => {
    userStore.signIn(email.value, password.value);
}
</script>