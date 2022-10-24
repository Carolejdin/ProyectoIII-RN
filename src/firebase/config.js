import app from 'firebase/app';
import firebase from 'firebase';

//Aca va la constante de la config de firebase.
const firebaseConfig = {
    apiKey: "AIzaSyBaBJdf0KlBVycJqrHjkt_9K2KVK5O5sp0",
    authDomain: "proyectoprogiii-rn.firebaseapp.com",
    projectId: "proyectoprogiii-rn",
    storageBucket: "proyectoprogiii-rn.appspot.com",
    messagingSenderId: "994935598658",
    appId: "1:994935598658:web:8b6b6296cc46f9f7ec07db"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()