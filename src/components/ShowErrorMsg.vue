<template>
    <v-snackbar 
        v-model="localShow" 
        :color="props.bgColor"
        :timeout="props.autoClose ? props.timeout : false"
        :prepend-icon="props.icon"
        :timer="props.timerPosition"
        :timer-color="props.txtColor"
        :contained="props.contained"
    >
        {{ props.errorMessage }}
        <template #actions><slot name="options">
            <v-btn
                class="ml-auto"
                :text="props.btnText"
                @click="localShow = false"
            />
        </slot></template>
    </v-snackbar>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    showError: {
        type: Boolean,
        //required: true,
        default: false,
    },
    autoClose: { 
        type: Boolean, 
        default: true
    },
    errorMessage: {
        type: String,
        default: 'There was an error. Please try again.',
    },
    bgColor: {
        type: String,
        default: 'error',
    },
    timeout: {
        type: Number,
        default: 15000,
    },
    icon: {
        type: String,
        default: 'mdi-cancel',
    },
    timerPosition: {
        type: String,
        default: 'bottom',
    },
    txtColor: {
        type: String,
        default: 'text',
    },
    contained: {
        type: Boolean,
        default: false,
    },
    btnText: {
        type: String,
        default: 'Close',
    },
});

const emit = defineEmits(['update:showError']);

const localShow = computed({
    get: () => props.showError,
    set: (val) => emit('update:showError', val),
});
</script>