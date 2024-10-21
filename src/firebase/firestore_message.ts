import { collection, CollectionReference, doc, getDoc, limit, onSnapshot, orderBy, query, setDoc, Timestamp } from "firebase/firestore";
import { currentUser, firestore, userCollection } from "./auth";
import type { message } from "../types/message";
import { get, writable } from "svelte/store";
import { v4 } from "uuid";
import { timeInterval, timestamp } from "rxjs";


const messageCollection = collection(
    firestore,
    "message"
) as CollectionReference<message>;

export async function sendMessage(content: string) {
    let userid = get(currentUser)?.uid;

    if (userid == null) return;

    const docId = v4();

    const docRef = doc(firestore, "messages", docId);

    await setDoc(docRef, {
        content,
        date: Timestamp.now(),
        uid: docId,
        userid
    })

}

export const messageState = writable<message[]>([], (setState) => {
    const messageQuery = query(
        messageCollection,
        orderBy("date", "desc"),
        limit(30)
    );

    const unsubsribe = onSnapshot(messageQuery, (snapshot) => {
        setState(
            snapshot.docs.map((docSnapshot) => { return docSnapshot.data(); })
        );
    });

    return unsubsribe;
})

export async function getUserData(userid:string) {
    const userDoc = doc(userCollection,userid);

    return ((await getDoc(userDoc)).data())
}