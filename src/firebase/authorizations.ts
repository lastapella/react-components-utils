import { firebaseApp } from './firebaseUI';
import { readRef } from './databaseUtils';

export const isAuthenticated = async (authUser: firebase.User) => {
	await authUser;
	return !!authUser;
};

export const isAuthenticatedAsAdmin = (
	authUser: firebase.User,
	role = null
) => {
	return readRef(firebaseApp.database(), 'administrators/' + authUser.uid)
		.then(admin => {
      return role ? admin.child('role').val() === role : !!admin;
		})
		.catch(reason => console.log(reason));
};