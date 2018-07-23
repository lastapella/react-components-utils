import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeComponent from '../modules/home';
import withLayout from '../shared/HOC/withLayout';
import LoginComponent from '../modules/login';
import LogoutComponent from '../modules/logout';
import ProfileEditComponent from '../modules/user_profile_edit';
import ParkingUserFormComponent from '../modules/parking_user_edit/databaseConnector';
import PrivateRoute from './privateRoute';
import withFirebaseUserContext from '../shared/HOC/firebase/withFirebaseUserContext';
import ListUsersComponent from '../modules/parking_user_list';
// import { RegisterConnector } from "../modules/register/RegisterConnector";
// import { LoginConnector } from "../modules/login/LoginConnector";

const Autre = () => (
	<div>
		<h2>Autre</h2>
	</div>
);

// const About = () => (
// 	<div>
// 		<h2>About</h2>
// 	</div>
// );

// const Topic = () => (
// 	<div>
// 		<h3>Topic</h3>
// 	</div>
// );
const SwitchRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => (
	<React.Fragment>
		<Switch>
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/"
				component={HomeComponent}
			/>
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				// exact={true}
				path="/parkinguser/:id"
				component={ParkingUserFormComponent}
			/>
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				// exact={true}
				path="/parkinguser2"
				component={ParkingUserFormComponent}
			/>
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/topic"
				component={ListUsersComponent}
			/>
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/autre"
				component={Autre}
			/>
			<Route exact={true} path="/login" component={LoginComponent} />
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/profile"
				component={ProfileEditComponent}
			/>
			{/*  tslint:disable-next-line:jsx-no-lambda */}
			<PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/logout"
				component={LogoutComponent}
			/>
		</Switch>
	</React.Fragment>
);
const SwitchRoutesWithLayout = withLayout(SwitchRoutes);

interface WithUserProps extends React.Props<any> {
	authUser: Promise<firebase.User>;
	currentUser: firebase.User;
}

const Routes = ({ authUser, ...rest}: WithUserProps) => {
	const isAuthenticated = () => {
		return !!authUser;
	};
	console.log('IS AUTHENTICATED ::: ', isAuthenticated());
	return (
		<BrowserRouter>
			<SwitchRoutesWithLayout isAuthenticated={isAuthenticated()} />
		</BrowserRouter>
	);
};

export default withFirebaseUserContext(Routes);
