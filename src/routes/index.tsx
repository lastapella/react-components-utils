import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeComponent from '../modules/home';
import withLayout from '../shared/HOC/withLayout';
import LoginComponent from '../modules/login';
import LogoutComponent from '../modules/logout';
import ProfileEditComponent from '../modules/user_profile_edit';
import ParkingUserFormComponent from '../modules/parking_user_edit/databaseConnector';
import PrivateRoute from './privateRoute';
import withFirebaseUser from '../firebase/withFirebaseUser';
import ListUsersComponent from '../modules/parking_user_list';
import {isAuthenticated as isAuthenticatedFunc, isAuthenticatedAsAdmin as isAuthenticatedAsAdminFunc} from '../firebase/authorizations';
// import { RegisterConnector } from "../modules/register/RegisterConnector";
// import { LoginConnector } from "../modules/login/LoginConnector";

// const Autre = () => (
// 	<div>
// 		<h2>Autre</h2>
// 	</div>
// );

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
const SwitchRoutes = ({ isAuthenticated , isAuthenticatedAsAdmin}: { isAuthenticated: boolean, isAuthenticatedAsAdmin : boolean }) => (
	<React.Fragment>
		<Switch>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				exact={true}
				path="/"
				component={HomeComponent}
			/>
				<PrivateRoute
					isAuthorized={isAuthenticatedAsAdmin}
					exact={true}
					path="/driver/list"
					component={ListUsersComponent}
				/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				// exact={true}
				path="/driver/add"
				component={ParkingUserFormComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				// exact={true}
				path="/driver/edit/:id"
				component={ParkingUserFormComponent}
			/>
			{/* <PrivateRoute
				isAuthenticated={isAuthenticated}
				exact={true}
				path="/autre"
				component={Autre}
			/> */}
			<Route exact={true} path="/login" component={LoginComponent} />
			<PrivateRoute
				isAuthorized={isAuthenticated}
				exact={true}
				path="/profile"
				component={ProfileEditComponent}
			/>
			{/*  tslint:disable-next-line:jsx-no-lambda */}
			<PrivateRoute
				isAuthorized={isAuthenticated}
				exact={true}
				path="/logout"
				component={LogoutComponent}
			/>
		</Switch>
	</React.Fragment>
);
const SwitchRoutesWithLayout = withLayout(SwitchRoutes);

interface WithUserProps extends React.Props<any> {
	authUser: firebase.User;
	currentUser: firebase.User;
}

const Routes = ({ authUser, ...rest}: WithUserProps) => {

	console.log('IS AUTHENTICATED ::: ', isAuthenticatedFunc(authUser));
	console.log('IS AUTHENTICATED AS ADMIN ::: ', isAuthenticatedAsAdminFunc(authUser));

	return (
		<BrowserRouter>
			<SwitchRoutesWithLayout isAuthenticated={isAuthenticatedFunc(authUser)} isAuthenticatedAsAdmin={isAuthenticatedAsAdminFunc(authUser)} />
		</BrowserRouter>
	);
};

export default withFirebaseUser()(Routes);
