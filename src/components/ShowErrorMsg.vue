<template>
    <v-snackbar 
        v-for="error in errorStore.errorList" 
        :key="error.id"

        v-model="error.showError" 
        :color="error.bgColor"
        :timeout="error.autoClose ? error.timeout : false"
        :prepend-icon="error.icon"
        :timer="error.timerPosition"
        :timer-color="error.txtColor"
        :contained="error.contained"
    >
        {{ error.message }}
        <template #actions><slot name="options">
            <v-btn
                class="ml-auto"
                :text="error.btnText"
                @click="error.showError = false"
            />
        </slot></template>
    </v-snackbar>
</template>

<script setup>
import { useErrorStore } from '@/store/error.js';

const errorStore = useErrorStore();


</script>