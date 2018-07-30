import config from '../firebase.config';
import * as firebase from 'firebase';

export const firebaseApp = firebase.initializeApp(config);


export interface IFirebaseUIConfig {
	signInFlow: string;
	signInSuccessUrl: string;
	signInOptions: string[];
}
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
