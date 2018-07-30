import * as React from 'react';
import { firebaseApp } from './firebase';
import getComponentDisplayName from '../shared/HOC/utils';
import { addRef, updateRef, readRef, removeRef } from './databaseUtils';
// import * as _ from 'lodash';

export interface InjectedProps extends React.Props<any> {
	databaseAction: IActions;
}
interface IActions {
	addUser: (args: IArgs) => Promise<string>;
	addVehicle: ({ driverID, ...args }: IArgs) => Promise<string>;
	editUser: (userKey: string, args: IArgs) => Promise<any>;
	getVehicle: (vehicleKey: string) => Promise<any>;
	getAllUsers: () => Promise<any[]>;
	getUser: (userKey: string) => Promise<any>;
	deleteUser: (userKey: string) => Promise<any>;
}
interface IArgs {
	[key: string]: string;
}
// Normalize a firebase snapshot with multiple record to a list of these records
const normalizeSnapshot = (snapshot: firebase.database.DataSnapshot) => {
	const result: any[] = [];
	snapshot.forEach(childSnapshot => {
		result.push({ key: childSnapshot.key, ...childSnapshot.val() });
	});
	return result;
};

const actions = (database: firebase.database.Database) => {
	return {
		addUser: (args: IArgs) => addRef(database, 'users/', args),
		addVehicle: ({ driverID, ...args }: IArgs) => {
			return addRef(database, `vehicles/`, args, args.iunumber).then(() => {
				return addRef(database, `driver_vehicle/${driverID}/vehicles/`, {
					iunumber: args.iunumber
				});
			});
		},
		editUser: (userKey: string, args: IArgs) =>
			updateRef(database, `users/${userKey}`, args),
		getVehicle: (vehicleKey: string) =>
			readRef(database, `vehicles/${vehicleKey}`).then(snapshot => {
				console.log('VEHICLE ', snapshot.val());
				return { key: snapshot.key, ...snapshot.val() };
			}),
		getAllUsers: () =>
			readRef(database, 'users/').then(snapshot => {
				return normalizeSnapshot(snapshot);
			}),
		getUser: (userKey: string) =>
			readRef(database, `users/${userKey}`).then(snapshot => {
				return { key: snapshot.key, ...snapshot.val() };
			}),
		deleteUser: (userKey: string) => removeRef(database, `users/${userKey}`)
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
