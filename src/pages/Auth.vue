<script setup>
import { ref } from 'vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'

const showSignIn = ref(true)
</script>

<template class="auth">
    <v-switch
        v-model="showSignIn"
        :label="showSignIn ? 'Sign In' : 'Sign Up'"
    />
    <SignIn v-show="showSignIn" />
    <SignUp v-show="!showSignIn" />
        
    
</template>