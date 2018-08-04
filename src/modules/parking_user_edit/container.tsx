import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// import withFirebaseDatabase from '../../firebase/withFirebaseDatabase';
import { addDriver, fetchDriver, editDriver } from '../../store/actions';
import {  IDriver } from '../../store/models/driverState';
import { RootState } from '../../store';
import DriverForm from './driverForm';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch &
	PropsFromState &
	RouteComponentProps<{ id: string }>;

export type PresenterProps = PropsFromDispatch &
	PropsFromState &
	RouteComponentProps<{ id: string }> & { driverId?: string };

class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: any) {
		super(props);
		this.state = {
			driverId: undefined,
			isLoaded: false
		};
	}
	public retreiveDriver(idDriverFromRoute: string) {
		if (idDriverFromRoute && this.props.driver) {
			this.setState(() => ({
				driverId: idDriverFromRoute,
				isLoaded: true
			}));
		} else if (idDriverFromRoute) {
			this.props
				.fetchDriver(idDriverFromRoute)
				.then(driverRetreived => {
					this.setState(() => ({
						driverId: idDriverFromRoute,
						isLoaded: true
					}));
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log('TODO HANDLE ERR :: :', err);
					}
					this.setState(() => ({ isLoaded: true }));
				});
		}
	}
	public componentDidMount() {
		const idDriverFromRoute = this.props.match.params.id;
		if (idDriverFromRoute) {
			this.retreiveDriver(idDriverFromRoute);
		} else {
			this.setState(() => ({ isLoaded: true }));
		}
	}
	public componentDidUpdate(
		prevProps: PropsFromDispatch &
			PropsFromState &
			RouteComponentProps<{ id: string }>
	) {
		if (
			this.props.match.params.id &&
			this.props.location !== prevProps.location
		) {
			this.retreiveDriver(this.props.match.params.id);
		} else if (this.props.location !== prevProps.location) {
			this.setState(() => ({ driverId: null, isLoaded: true }));
		}
	}
	public render() {
		const { isLoaded, driverId } = this.state;
		return (
			<React.Fragment>
				{' '}
				{isLoaded ? (
					<DriverForm {...this.props} driverId={driverId} />
				) : (
					<div> Loading ... </div>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return { driver: state.drivers[props.match.params.id] };
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		addDriver: (driverValues: IDriver) => dispatch(addDriver(driverValues)),
		editDriver: (driverKey: string, driverValues: IDriver) =>
			dispatch(editDriver(driverKey, driverValues)),
		fetchDriver: (driverKey: string) => dispatch(fetchDriver(driverKey))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
