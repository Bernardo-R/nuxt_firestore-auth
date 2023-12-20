<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { postPeople } = useFirestore()

const cities = ['NY', 'NJ', 'PA']


const schema = z.object({
    name: z.string().min(3, 'Muy corto'),
    location: z.enum(cities),
    phone: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = ref({
    name: undefined,
    location: undefined,
    phone: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    await postPeople({
        name: event.data.name,
        location: event.data.location,
        phone: event.data.phone,
    })
    // Do something with data
    console.log(event.data)
}
</script>

<template>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Nombre Completo" name="name">
            <UInput v-model="state.name" type="text" />
        </UFormGroup>

        <UFormGroup label="Telefono" name="phone">
            <UInput v-model="state.phone" type="text" />
        </UFormGroup>

        <UFormGroup label="Locacion" name="location">
            <USelect v-model="state.location" :options="cities" />
        </UFormGroup>

        <UButton type="submit">
            Submit
        </UButton>
    </UForm>
</template>


