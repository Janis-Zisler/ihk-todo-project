<template>
    <v-card class="pa-5" color="" variant="elevated">
        <v-card-title class="text-h4 text-center">Create Account</v-card-title>
        <v-card-text>
            <v-form 
                @submit.prevent="signUp"
                v-model="formComplete"
            >
                <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    required
                    :rules="[rules.required, rules.email]"
                />
                <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    :rules="[rules.required]"
                />
                <v-text-field
                    v-model="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    required
                    :rules="[rules.required, rules.passwordMatch(password, passwordConfirm)]"
                />
            </v-form>
                        
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-btn 
                color="success" 
                @click="signUp"
                :loading=" currentStatus === 'sending-data' ? true : false"
                :disabled="!formComplete"
            >Sign Up</v-btn>
        </v-card-actions>

        <v-dialog v-model="showDialog" max-width="340">
            <v-card
                prepend-icon="mdi-at"
                text="Please check your email and click the confirmation link."
                title="Account Created"
            >
                <template #actions>
                    <v-btn
                        class="ml-auto"
                        text="Close"
                        @click="emit('gotoSignIn')"
                    />
                </template>
            </v-card>
        </v-dialog>
    </v-card>

    
    
</template>

<script setup>
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()

const formComplete = ref(false);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const showDialog = computed({
    get() {
        return currentStatus.value === 'confirm-email';
    },
    set(value) {
        if (!value) {
            currentStatus.value = 'logged-out';
        }
    }
});
const currentStatus = ref('logged-out');

const signUp = () => {
    currentStatus.value = 'sending-data';
    if (password.value !== passwordConfirm.value) {
        // Handle password mismatch error
        return;
    }
    userStore.signUp(email.value, password.value);

    currentStatus.value = 'confirm-email';
}

const emit = defineEmits(['gotoSignIn']);

const rules = {
    required: value => !!value || 'Field is required',
    email: value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Email is invalid',
    passwordMatch: (value, other) => value === other || 'Passwords do not match'
}
</script>