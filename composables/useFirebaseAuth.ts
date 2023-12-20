import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useFirebaseAuth = () => {

    const { $auth } = useNuxtApp()

    const register = async (email: string, password: string) =>{
        try {
            const userCredential = await createUserWithEmailAndPassword($auth, email, password);
            const user = userCredential.user;
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword($auth, email, password);
            const user = userCredential.user;
            console.log(user)
        } catch (error) {
            console.log(error)
        }
    };

    const signout = async () => {

        const toast = useToast()
        try {
            await signOut($auth)
            toast.add( {
                title: 'loggin Out...', 
                timeout: 1000,
                callback: async() =>{
                    await navigateTo('/login')
                }
            } )
        
        } catch (error) {
            console.log(error)
        }
    }

    const curretnUserPromise = () => new Promise( (resolve, reject) => {
        const unsubscribe = onAuthStateChanged($auth, (user) => {
            unsubscribe()
            resolve(user)
        }, reject)
    })

    const currentUser = $auth.currentUser;
    

    return {
        register,
        login,
        signout,
        curretnUserPromise,
        currentUser
    }

}