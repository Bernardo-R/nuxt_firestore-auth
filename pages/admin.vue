<template>
    <div>
        <h1>admin page (ruta protegida)</h1>
        <h2>{{ currentUser?.email }}</h2>
        <h2>{{ currentUser?.uid }}</h2>
        
        <UButton @click ="signout">Log out</UButton>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'auth'
})

const { signout, currentUser } = useFirebaseAuth()

</script>

