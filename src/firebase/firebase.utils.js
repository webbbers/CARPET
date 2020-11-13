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

export const createUserProfileDocument = async (userAuth,additionalData) =>{
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName,email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message)
      }
    }
    return userRef;
  }

firebase.initializeApp(config);

export const auth=firebase.auth();
  export const firestore = firebase.firestore()

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;