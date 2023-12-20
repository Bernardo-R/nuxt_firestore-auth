<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
  
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
  
      <UButton type="submit">
        log In
      </UButton>
    </UForm>

  </template>

<script setup lang="ts">
import { z } from 'zod'
import { ref } from 'vue'
import type { FormSubmitEvent } from '#ui/types'

const toast = useToast()

const { login } = useFirebaseAuth()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = ref({
  email: undefined,
  password: undefined
})

async function onSubmit (event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data)

  try{
    await login(event.data.email, event.data.password)
    toast.add( {
        title: 'log in successful', 
        timeout: 1000,
        callback: async() =>{
            await navigateTo('/admin')
        }
    } )
    

  }catch(error){
    console.log(error)
  }
}

</script>