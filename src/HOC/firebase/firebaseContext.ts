import * as React from 'react';
import config from '../../firebase.config';
import * as firebase from 'firebase';

firebase.initializeApp(config);

export const firebaseUIConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	]
};
export const FirebaseContext = React.createContext(firebase);
