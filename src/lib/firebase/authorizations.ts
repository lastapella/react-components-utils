import { firebaseApp } from './firebase';
import { readRef } from './databaseUtils';

export const isAuthenticated = async (authUser: firebase.User) => {
	await authUser;
	return !!authUser;
};

export const isAuthenticatedAsAdmin = (
	authUser: firebase.User,
	role = null
) => {
	return authUser
		? readRef(firebaseApp.database(), 'administrators/' + authUser.uid)
				.then(admin => {
					return role
						? admin
								.child('role')
								.val()
								.includes(role)
						: !!admin;
				})
				.catch(reason => {
					if (process.env.NODE_ENV !== 'production') {
						console.log(reason);
					}
					return false;
				})
		: false;
};
