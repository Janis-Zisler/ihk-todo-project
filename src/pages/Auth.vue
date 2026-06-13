<script setup>
import { ref } from 'vue';
import SignIn from '@/components/SignIn.vue';
import SignUp from '@/components/SignUp.vue';

const tab = ref('in');
</script>

<template class="auth">
    <v-sheet elevation="2">
    <v-tabs v-model="tab" color="primary" bg-color="blue-grey-darken-4">
        <v-tab value="in">Sign In</v-tab>
        <v-tab value="up">Sign Up</v-tab>
    </v-tabs>

    <v-divider></v-divider>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item value="in">
            <SignIn />
        </v-tabs-window-item>
        <v-tabs-window-item value="up">
            <SignUp />
        </v-tabs-window-item>
    </v-tabs-window>
    </v-sheet>
</template>