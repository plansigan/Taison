import firebase from 'firebase'


if(!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyDCY2S7sKw2yS-mpYx8o6hMqtoAoqK-6_Q",
        authDomain: "taison-exam.firebaseapp.com",
        databaseURL: "https://taison-exam.firebaseio.com",
        projectId: "taison-exam",
        storageBucket: "taison-exam.appspot.com",
        messagingSenderId: "253771894828",
        appId: "1:253771894828:web:bcb572615b12d448"
    })
}

// // firebase.firestore().settings({ timestampsInSnapshots: true })
// const storage = firebase.storage() //if use storage

export default firebase