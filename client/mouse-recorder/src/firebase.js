import firebase from "firebase";

var config = {
    apiKey: "AIzaSyABRbHjaQzuKeXkBleQrIc3huRHXh62TJE",
    authDomain: "upright-labs.firebaseapp.com",
    databaseURL: "https://upright-labs.firebaseio.com",
    projectId: "upright-labs",
    storageBucket: "",
    messagingSenderId: "948546294294"
};
firebase.initializeApp(config);

export default firebase;
    
