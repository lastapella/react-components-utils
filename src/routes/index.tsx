import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomeComponent from '../modules/home';
import withLayout from '../shared/HOC/withLayout';
import LoginComponent from '../modules/login';
import LogoutComponent from '../modules/logout';
import ProfileEditComponent from '../modules/user_profile_edit';
import PrivateRoute from './privateRoute';
import ListUsersComponent from '../modules/parking_user_list';
import ParkingUserFormComponent from '../modules/parking_user_edit';
import AdminEditFormComponent from '../modules/administrator/edit';
import AdminEditListComponent from '../modules/administrator/list';
import HardwareManagementTabView from '../modules/hardware_management';
import EventTabView from '../modules/events';
import DataTabView from '../modules/hardware_data';
import {
	isAuthenticated as isAuthenticatedFunc,
	isAuthenticatedAsAdmin as isAuthenticatedAsAdminFunc
} from '../lib/firebase/authorizations';
import { RootState } from '../store';
import { connect } from 'react-redux';
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

const InProgress = () => <>IN PROGRESS</>;

const SwitchRoutes = ({
	isAuthenticated,
	isAuthenticatedAsAdmin
}: {
	isAuthenticated: boolean;
	isAuthenticatedAsAdmin: boolean;
}) => (
	<React.Fragment>
		<Switch>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/"
				component={HomeComponent}
			/>
			<Route exact={true} path="/login" component={LoginComponent} />
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/drivers/list"
				component={ListUsersComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/drivers/add"
				component={ParkingUserFormComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				// exact={true}
				path="/drivers/edit/:id"
				component={ParkingUserFormComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/administrators/add"
				component={AdminEditFormComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				// exact={true}
				path="/administrators/edit/:id"
				component={AdminEditFormComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/administrators/list"
				component={AdminEditListComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/hardware/management"
				component={HardwareManagementTabView}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/hardware/events"
				component={EventTabView}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticatedAsAdmin}
				messageText={getAuthorisationMessage('isAuthenticatedAsAdmin')}
				exact={true}
				path="/hardware/data"
				component={DataTabView}
			/>

			<PrivateRoute
				isAuthorized={isAuthenticated}
				messageText={getAuthorisationMessage('isAuthenticated')}
				exact={true}
				path="/profile"
				component={ProfileEditComponent}
			/>
			<PrivateRoute
				isAuthorized={isAuthenticated}
				messageText={getAuthorisationMessage('isAuthenticated')}
				exact={true}
				path="/logout"
				component={LogoutComponent}
			/>
		</Switch>
	</React.Fragment>
);
const SwitchRoutesWithLayout = withLayout(SwitchRoutes);

interface RoutesState {
	isAuthenticated: boolean;
	isAuthenticatedAsAdmin: boolean;
	isLoaded: boolean;
}

class Routes extends React.Component<RoutesProps, RoutesState> {
	public constructor(props: RoutesProps) {
		super(props);
		this.state = {
			isAuthenticated: false,
			isAuthenticatedAsAdmin: false,
			isLoaded: false
		};
	}

	public setAuthentications(authUser: firebase.User | null) {
		return Promise.all([
			isAuthenticatedFunc(authUser),
			isAuthenticatedAsAdminFunc(authUser)
		])
			.then(values => {
				this.setState(() => ({
					isAuthenticated: values[0],
					isAuthenticatedAsAdmin: values[1],
					isLoaded: true
				}));
			})
			.catch(err => {
				if (process.env.NODE_ENV !== 'production') {
					console.log(err);
				}
			});
	}
	public componentDidMount() {
		const { authUser } = this.props;
		this.setAuthentications(authUser);
	}

	// public componentWillUpdate(nextProps: WithUserProps) {
	// 	console.log(nextProps.authUser !== this.props.authUser);
	// 	if (nextProps.authUser !== this.props.authUser) {
	// 		this.setAuthentications(nextProps.authUser);
	// 	}
	// }
	render() {
		const { isAuthenticated, isAuthenticatedAsAdmin, isLoaded } = this.state;
		return (
			<BrowserRouter>
				{isLoaded && (
					<SwitchRoutesWithLayout
						isAuthenticated={isAuthenticated}
						isAuthenticatedAsAdmin={isAuthenticatedAsAdmin}
					/>
				)}
			</BrowserRouter>
		);
	}
}

const authorizationMessages = {
	isAuthenticated:
		'You are not allowed to see this page as you are not authenticated',
	isAuthenticatedAsAdmin:
		'You are not allowed to see this page as you are not authenticated as Administrator',
	default: 'You are not allowed to see this page'
};
const getAuthorisationMessage = (auth: string) =>
	authorizationMessages[auth] || authorizationMessages.default;

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	[key: string]: any;
}

type RoutesProps = PropsFromDispatch & PropsFromState;

const mapStateToProps = (state: RootState, props: any) => {
	return {
		authUser: state.user.user
	};
};
const mapDispatchToProps = () =>
	// dispatch: ThunkDispatch<RootState, void, Action>
	{
		return {};
	};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(Routes);
