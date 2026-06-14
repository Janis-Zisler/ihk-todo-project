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
                        value => !!value || 'Field is required',
                        value => /^[\w.+-]+@[\w-]+(?:\.[\w-]{2,})+$/.test(value) || 'Email is invalid',
                    ]"
                />
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    @keyup.enter="signIn"
                    :rules="[
                        value => !!value || 'Field is required',
                        value => value.length >= 6 || 'Password must be at least 6 characters long'
                    ]"
                />
            </v-form>

            <!-- <v-snackbar 
                v-model="errorObj.showError.show" 
                color="error"
                timeout="15000"
                prepend-icon="mdi-cancel"
                timer="bottom"
                timer-color="text"
                contained
            >
                {{ errorObj.errorMessage }}
                <template #actions>
                    <v-btn
                        class="ml-auto"
                        text="Close"
                        @click="errorObj.showError.show = false"
                    />
                </template>
            </v-snackbar>  -->
            <ShowErrorMsg 
                v-bind="errorObj" 
                @update:show-error="errorObj.showError = $event.showError" 
            />
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

import { useUserStore } from '@/store/user.js'
import ShowErrorMsg from './ShowErrorMsg.vue';
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const formComplete = ref(false);

const errorObj = reactive({
    showError: false,
    errorMessage: '',
    //contained: true,
});

const signIn = async () => {
    if(!formComplete.value) return;
    try {
        await userStore.signIn(email.value, password.value);
    } catch (error) {
        errorObj.errorMessage = error.message || 'Failed to sign in. Please check your email and password.';
        errorObj.showError = true;
    }
}
</script>