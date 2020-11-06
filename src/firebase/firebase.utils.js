import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config =  {
    apiKey: "AIzaSyAhi-uI8uzkOt1JiUPdXEbnmgQxJGzw08U",
    authDomain: "react-quiz-214cb.firebaseapp.com",
    databaseURL: "https://react-quiz-214cb.firebaseio.com",
    projectId: "react-quiz-214cb",
    storageBucket: "react-quiz-214cb.appspot.com",
    messagingSenderId: "13854425134",
    appId: "1:13854425134:web:deeed96c9cf6e397509fbf",
    measurementId: "G-VYQDRDPGKN"
};


firebase.initializeApp(config);