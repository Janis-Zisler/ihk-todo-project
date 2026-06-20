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
                variant="outlined"
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
    </v-card>

    
    
</template>

<script setup>
import { ref, reactive, computed, toRefs } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()

import { useErrorStore } from '@/store/error.js'
const errorStore = useErrorStore();

const emit = defineEmits(['gotoSignIn']);


const formComplete = ref(false);
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

const errorObj = reactive({
    showError: true,
    message: '',
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
    // Validation
    currentStatus.value = 'sending-data';
    if (password.value !== passwordConfirm.value) { // Passwords identical?
        errorObj.message = 'Passwords do not match.';
        errorStore.addNewError(errorObj);
        return;
    }

    if (password.value.length < 6) { // Password min lenght ?
        errorObj.message = 'Password must be at least 6 characters long.';
        errorStore.addNewError(errorObj);
        return;
    }

    // Sign up @ userStore->supabase
    try {
        await userStore.signUp(email.value, password.value);
        currentStatus.value = 'confirm-email';
    }
    catch (error) {
        errorObj.message = error.message || 'Failed to sign up. Please try again.';
        errorStore.addNewError(errorObj);
        currentStatus.value = 'logged-out';
    }
}

const { rules } = toRefs(userStore);

</script>