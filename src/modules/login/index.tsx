import withFirebaseAuth from '../../shared/HOC/firebase/withFirebaseAuth';
import SignInScreen from './firebaseLogin';
// import * as React from 'react';
// const LoginComponent = () => <SignInScreen />;
export default withFirebaseAuth(SignInScreen);
