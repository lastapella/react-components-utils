export default (firebaseFunction: firebase.functions.Functions) => {
	return {
		// helloWord: firebaseFunction.httpsCallable('helloWorld2'),
		addAdmin: firebaseFunction.httpsCallable('administrators_add'),
		updateAdmin: firebaseFunction.httpsCallable('administrors_update'),
		deleteAdmin: firebaseFunction.httpsCallable('administrators_delete'),
		getAdmin: firebaseFunction.httpsCallable('administrators_get'),
		getAllAdmins: firebaseFunction.httpsCallable('administrators_getAll'),
		listFirebaseUsers: firebaseFunction.httpsCallable('administrators_listUser')
	};
};