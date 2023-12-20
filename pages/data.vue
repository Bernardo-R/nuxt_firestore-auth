<script setup lang="ts">

const { getPeoples, peoples } = useFirestore()

await getPeoples()

</script>

<template>
  <ClientRequestForm />
  <UTable :rows="peoples" />
</template>