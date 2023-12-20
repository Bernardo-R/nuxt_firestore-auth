import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) =>{
  const runtimeConfig = useRuntimeConfig()
   
   
    const firebaseConfig = {
        apiKey: "AIzaSyB4cUgjXy95wEW_wXeYHX0flkQoyYDK7a8",
        authDomain: "marycargoigfroms.firebaseapp.com",
        projectId: "marycargoigfroms",
        storageBucket: "marycargoigfroms.appspot.com",
        messagingSenderId: "1038131226244",
        appId: "1:1038131226244:web:0c6d67bb8eabf9b0e944d1"
      };

      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app)
      const db = getFirestore(app);

      

      return {
        provide: {
            auth,
            db,
        }
      }
})