import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
	addDriver,
	fetchDriver,
	editDriver,
	addOrUpdateVehiclesList,
	fetchVehicleList
} from '../../store/actions';
import { IDriver, IVehicle } from '../../store/models';
import { RootState } from '../../store';
import DriverForm from './driverForm';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & PropsFromState & OwnProps;
export type PresenterProps = PropsFromDispatch &
	PropsFromState &
	OwnProps & { driverId?: string };
type OwnProps = RouteComponentProps<{ id: string }>;

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
					this.props.fetchVehicleList(driverRetreived.vehicles).then(() => {
						this.setState(() => ({
							driverId: idDriverFromRoute,
							isLoaded: true
						}));
					});
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
	const driver = state.drivers[props.match.params.id];
	const driverVehicles =
		driver && driver.vehicles
			? driver.vehicles.map(vehicleKey => state.vehicles[vehicleKey])
			: null;
	const locationsKey = Object.keys(state.gates);
	const gatesDefaultValue = {};
	locationsKey.forEach(
		locationKey =>
			(gatesDefaultValue[locationKey] = Object.keys(
				state.gates[locationKey]
			).reduce(
				(defaultValue, gateKey) => ({ ...defaultValue, [gateKey]: false }),
				{}
			))
	);
	return {
		driver,
		vehicles: driverVehicles,
		gatesDefaultValue
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		addDriver: (driverValues: IDriver) => dispatch(addDriver(driverValues)),
		editDriver: (driverKey: string, driverValues: IDriver) =>
			dispatch(editDriver(driverKey, driverValues)),
		fetchDriver: (driverKey: string) => dispatch(fetchDriver(driverKey)),
		addOrUpdateVehiclesList: (
			vehiclesListAdded: IVehicle[],
			driverKey: string,
			keysVehicleListRemoved?: string[]
		) =>
			dispatch(
				addOrUpdateVehiclesList(
					vehiclesListAdded,
					driverKey,
					keysVehicleListRemoved
				)
			),
		fetchVehicleList: (vehicleKeyList: [string]) =>
			dispatch(fetchVehicleList(vehicleKeyList))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
