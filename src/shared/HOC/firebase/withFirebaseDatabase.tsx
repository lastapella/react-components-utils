import * as React from 'react';
import { firebaseApp } from '../../../firebase/firebase';
import getComponentDisplayName from '../utils';
import { addRef, updateRef, readRef } from '../../../firebase/databaseUtils';

export interface InjectedProps extends React.Props<any> {
	databaseAction: IActions;
}
interface IActions {
	addUser: (args: IArgs) => Promise<any>;
	editUser: (userKey: string, args: IArgs) => Promise<any>;
	readUsers: () => Promise<firebase.database.DataSnapshot>;
	readUser: (userKey: string) => Promise<firebase.database.DataSnapshot>;
}
interface IArgs {
	[key: string]: string;
}

const actions = (database: firebase.database.Database) => {
	return {
		addUser: (args: IArgs) => addRef(database, 'users/', args),
		editUser: (userKey: string, args: IArgs) =>
			updateRef(database, `users/${userKey}`, args),
		readUsers: () =>
			readRef(database, 'users/').then(snapshot => {
				const result: any[] = [];
				snapshot.forEach(childSnapshot => {
					result.push({ key: childSnapshot.key, ...childSnapshot.val() });
				});
				return result;
			}),
		readUser: (userKey: string) =>
			readRef(database, `users/${userKey}`).then(snapshot => {
				return { key: snapshot.key, ...snapshot.val() };
			})
	};
};

export default <P extends InjectedProps>(
	ComposedComponent: React.ComponentType<P>
) => {
	class WithFirebaseDatabase extends React.Component<P, any> {
		public static displayName = `WithFirebaseDatabase(${getComponentDisplayName(
			ComposedComponent
		)})`;
		public render() {
			return (
				<ComposedComponent
					{...this.props}
					databaseAction={actions(firebaseApp.database())}
				/>
			);
		}
	}
	return WithFirebaseDatabase;
};
