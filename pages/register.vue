<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
  
      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>
  
      <UButton type="submit">
        Submit
      </UButton>
    </UForm>
  </template>

<script setup lang="ts">
import { z } from 'zod'
import { ref } from 'vue'
import type { FormSubmitEvent } from '#ui/types'

const {register} = useFirebaseAuth()

const toast = useToast()

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
    await register(event.data.email, event.data.password)
    toast.add( {
        title: 'creating account', 
        timeout: 2000,
        callback: async() =>{
            await navigateTo('/admin')
        }
    } )
    

  }catch(error){
    console.log(error)
  }
}


// const email = ref("")
// const password = ref("")

// const handleSubmit = async () => {
//  try{
//     await register(email.value, password.value)
//  }catch (error) {

//  }
    
// }
</script>

