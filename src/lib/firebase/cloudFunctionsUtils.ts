export default (firebaseFunction: firebase.functions.Functions) => {
	return {
		// helloWord: firebaseFunction.httpsCallable('helloWorld2'),
		addAdmin: firebaseFunction.httpsCallable('addAdmin'),
		updateAdmin: firebaseFunction.httpsCallable('updateAdmin'),
		deleteAdmin: firebaseFunction.httpsCallable('deleteAdmin'),
		getAdmin: firebaseFunction.httpsCallable('getAdmin'),
		getAllAdmins: firebaseFunction.httpsCallable('getAllAdmins'),
		listFirebaseUsers: firebaseFunction.httpsCallable('listUsers')
	};
};