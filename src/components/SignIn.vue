<template>
    <v-card class="pa-5" color="" variant="elevated">
        <v-card-title class="text-h4 text-center">Sign In</v-card-title>
        <v-card-text>
            <v-form @submit.prevent="signIn" v-model="formComplete">
                <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                    @keyup.enter="signIn"
                    :rules="[
                        rules.required,
                        rules.email
                    ]"
                />
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    @keyup.enter="signIn"
                    :rules="[
                        rules.required,
                        rules.passwordLength
                    ]"
                />
            </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn 
                color="success" 
                @click="signIn" 
                :disabled="!formComplete"
            >Sign In</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, reactive } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter();

// Stores
import { useUserStore } from '@/store/user.js'
import { useErrorStore } from '@/store/error.js'
const userStore = useUserStore();
const errorStore = useErrorStore();

const { rules } = useUserStore();
// Data
const email = ref('');
const password = ref('');
const formComplete = ref(false);

const errorObj = reactive({
    showError: true,
    message: '',
});

const signIn = async () => {
    if(!formComplete.value) return;
    try {
        await userStore.signIn(email.value, password.value);
    } catch (error) {
        errorObj.message = error.message || 'Failed to sign in. Please check your email and password.';
        errorStore.addNewError( errorObj );
    }
}
</script>