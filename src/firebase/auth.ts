import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { type User} from "firebase/auth";
import { app } from "./firebase";
import { writable } from "svelte/store";
import { collection, CollectionReference, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import type { FirestoreUser } from "../types/firestore_user";
import { v4 } from "uuid";

export const auth = getAuth(app);

export const authState = writable<User | null>(null);

// export const signInOut =  signOut();

auth.onAuthStateChanged((user) => {
    userChange(user); 
    authState.set(user);
    
});

export async function logout() {
    const auth = getAuth();
    try {
        await signOut(auth);
        console.log("Usuário desconectado");
    } catch (error) {
        console.error("Erro ao fazer logout:", error);
    }
}

export async function signInGoogle() {
    const provider = new GoogleAuthProvider();
    try {
        const authResult = await  signInWithPopup(auth, provider);
        return authResult;
      } catch (error) {
        console.error("Erro durante o login com Google:", error);
        throw error;
      }
}



export const firestore = getFirestore(app);

export const currentUser = writable<FirestoreUser | null>(null);

export const userCollection = collection(
    firestore,
    "user"
) as CollectionReference<FirestoreUser>;

export async function userChange(user:User) {
    if(user == null){ currentUser.set(null); return;}

    const userDocRef = doc(userCollection,user.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(userSnapshot.exists()){
        const userData = userSnapshot.data();

        currentUser.set(userData);

        return;
    }
    

    const userData: FirestoreUser = {
        name: user.displayName || "User " + v4(),
        uid: user.uid,
        display_image_url: user.photoURL,
        email: user.email
    };
    
      await setDoc(userDocRef, {
        name: user.displayName || "User " + v4(),
        uid: user.uid,
        display_image_url: user.photoURL,
        email: user.email
      }, { merge: true });
      
    
      currentUser.set(userData);
}
