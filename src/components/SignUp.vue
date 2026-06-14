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
                    :rules="[rules.required, rules.passwordLength]"
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

        <v-dialog 
            v-model="showDialog" 
            max-width="340" 
            @click:outside="closeDialog"
        >
            <v-card
                prepend-icon="mdi-at"
                text="Please check your email and click the confirmation link."
                title="Account Created"
            >
                <template #actions>
                    <v-btn
                        class="ml-auto"
                        text="Close"
                        @click="closeDialog"
                    />
                </template>
            </v-card>
        </v-dialog>
        <ShowErrorMsg 
            v-bind="errorObj" 
            @update:show-error="errorObj.showError = $event.showError" 
        />
    </v-card>

    
    
</template>

<script setup>
import ShowErrorMsg from './ShowErrorMsg.vue';
import { ref, reactive, computed } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()

const emit = defineEmits(['gotoSignIn']);


const formComplete = ref(false);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const errorObj = reactive({
    showError: false,
    errorMessage: '',
});
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
const closeDialog = () => {
    emit('gotoSignIn');
    showDialog.value = false;
}
const currentStatus = ref('logged-out');

const signUp = async () => {
    currentStatus.value = 'sending-data';
    if (password.value !== passwordConfirm.value) { // Passwords identical?
        errorObj.errorMessage = 'Passwords do not match.';
        errorObj.showError = true;
        return;
    }

    if (password.value.length < 6) { // Password min lenght ?
        errorObj.errorMessage = 'Password must be at least 6 characters long.';
        errorObj.showError = true;
        return;
    }

    try {
        await userStore.signUp(email.value, password.value);
        currentStatus.value = 'confirm-email';
    }
    catch (error) {
        errorObj.errorMessage = error.message || 'Failed to sign up. Please try again.';
        errorObj.showError = true;
        currentStatus.value = 'logged-out';
    }
}

const rules = {
    required: value => !!value || 'Field is required',
    email: value => /^[\w.+-]+@[\w-]+(?:\.[\w-]{2,})+$/.test(value) || 'Email is invalid',
    passwordMatch: (value, other) => value === other || 'Passwords do not match',
    passwordLength: value => value.length >= 6 || 'Password must be at least 6 characters long'
}
</script>