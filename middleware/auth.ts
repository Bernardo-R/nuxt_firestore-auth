export default defineNuxtRouteMiddleware(async(to, from ) => {
    if (process.server) return
    console.log('middelware is active')
    
    const { curretnUserPromise } = useFirebaseAuth()

    const user = await curretnUserPromise()

    if (!user && to.path !== '/login') {
        return navigateTo('/login')

    }
})