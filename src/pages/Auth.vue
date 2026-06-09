<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user.js'

const router = useRouter()
const userStore = useUserStore()
</script>

<template>
    <div class="auth">
        <h1>Auth</h1>
        <button @click="userStore.signIn('a36lq086w@mozmail.com', '~5RqPe5]+@V2H3j'); router.push('/')">Login</button>
    </div>
</template>