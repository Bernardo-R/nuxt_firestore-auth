import { collection, getDocs, addDoc } from "firebase/firestore"; 
import type { People } from "~/interface/people.type";

export const useFirestore = () => {
    const { $db } = useNuxtApp();

    const peoples = useState('counter', () => ([] as People[]))

    const getPeoples = async () => {
     try {
        const querySnapshot = await getDocs(collection($db, "ig_clients"));
        
        peoples.value = querySnapshot.docs.map((doc) => {
            return  { id: doc.id, ...doc.data() } as People;
        });

    } catch (error) {
        console.log(error);
    };
}

    const postPeople = async (people: {name: string, location: string, phone: string}) => {
        try {
            const docRef = await addDoc(collection($db, "ig_clients"), people);
            peoples.value = [...peoples.value, { id: docRef.id, ...people }];
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
    
    return {
        getPeoples,
        postPeople,
        peoples
    } 
}


