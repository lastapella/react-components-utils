import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect /* DispatchProps */ } from 'react-redux';
import { Action, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// import withFirebaseDatabase from '../../firebase/withFirebaseDatabase';
import { addDriver } from '../../store/actions';
import { IDriver } from '../../store/models/driverState';
import { RootState } from '../../store';
import DriverForm from './driverForm';

interface PropsFromDispatch {
	addDriver: typeof addDriver;
}

interface PropsFromState {
	driver: IDriver;
}

export type PresenterProps = PropsFromDispatch &
	PropsFromState &
	RouteComponentProps<{ id: string }>;

class FormContainer extends React.Component<
	PropsFromDispatch & PropsFromState & RouteComponentProps<{ id: string }>,
	any
> {
	public constructor(props: any) {
		super(props);
		console.log(props);
		this.state = {
			user: undefined,
			isLoaded: false
		};
	}
	public componentDidMount() {
		this.props.addDriver({});
	}
	// 	if (this.props.match.params.id) {
	// 		this.props.databaseAction
	// 			.getUser(this.props.match.params.id)
	// 			.then(user => {
	// 				this.setState(() => ({ user, isLoaded: true }));
	// 			});
	// 	} else {
	// 		this.setState(() => ({ isLoaded: true }));
	// 	}
	// }
	// public componentDidUpdate(
	// 	prevProps: withDatabaseInjectedProps & RouteComponentProps<{ id: string }>
	// ) {
	// 	if (
	// 		this.props.match.params.id &&
	// 		this.props.location !== prevProps.location
	// 	) {
	// 		this.props.databaseAction
	// 			.getUser(this.props.match.params.id)
	// 			.then(user => {
	// 				this.setState(() => ({ user, isLoaded: true }));
	// 			});
	// 	} else if (this.props.location !== prevProps.location) {
	// 		this.setState(() => ({ user: null, isLoaded: true }));
	// 	}
	// }
	public render() {
		const { isLoaded, user } = this.state;
		return (
			<React.Fragment>
				{' '}
				{isLoaded ? (
					<DriverForm userMatched={user} {...this.props} />
				) : (
					<div> Loading ... </div>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState) => {
	return { driver: state.drivers };
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		addDriver: (driverValues: IDriver) => dispatch(addDriver(driverValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
