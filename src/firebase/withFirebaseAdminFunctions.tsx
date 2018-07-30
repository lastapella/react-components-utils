import * as React from 'react';
import { firebaseApp } from './firebase';
import getComponentDisplayName from '../shared/HOC/utils';
// import { addRef, updateRef, readRef, removeRef } from './databaseUtils';
// import * as _ from 'lodash';

export interface InjectedProps extends React.Props<any> {
	functions: IFunctions;
}
interface IFunctions {
  helloWord: firebase.functions.HttpsCallable;
  addAdmin: firebase.functions.HttpsCallable;
  updateAdmin: firebase.functions.HttpsCallable;
  deleteAdmin: firebase.functions.HttpsCallable;
  getAdmin: firebase.functions.HttpsCallable;
  getAllAdmins: firebase.functions.HttpsCallable;
  listFirebaseUsers: firebase.functions.HttpsCallable;
}
// interface IArgs {
// 	[key: string]: string;
// }
// Normalize a firebase snapshot with multiple record to a list of these records
// const normalizeSnapshot = (snapshot: firebase.database.DataSnapshot) => {
// 	const result: any[] = [];
// 	snapshot.forEach(childSnapshot => {
// 		result.push({ key: childSnapshot.key, ...childSnapshot.val() });
// 	});
// 	return result;
// };

// TODO ADD LAYER TO EXPORT ONLY FUNCTIONS WITH REQUIRED TYPES
const functions = (firebaseFunction: firebase.functions.Functions) => {
	return {
		helloWord: firebaseFunction.httpsCallable('helloWorld2'),
		addAdmin: firebaseFunction.httpsCallable('addAdmin'),
		updateAdmin: firebaseFunction.httpsCallable('updateAdmin'),
		deleteAdmin: firebaseFunction.httpsCallable('deleteAdmin'),
		getAdmin: firebaseFunction.httpsCallable('getAdmin'),
		getAllAdmins: firebaseFunction.httpsCallable('getAllAdmins'),
		listFirebaseUsers: firebaseFunction.httpsCallable('listUsers')
	};
};

// const httpsCallable = (firebaseFunction: firebase.functions.Functions , functionName: string) => {

// }

export default <P extends InjectedProps>(
	ComposedComponent: React.ComponentType<P>
) => {
	class WithFirebaseAdminFunctions extends React.Component<P, any> {
		public static displayName = `WithFirebaseAdminFunctions(${getComponentDisplayName(
			ComposedComponent
		)})`;
		public render() {
			return (
				<ComposedComponent
					{...this.props}
					functions={functions(firebaseApp.functions())}
				/>
			);
		}
	}
	return WithFirebaseAdminFunctions;
};
