import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { RootState } from '../../store';
import { IGateState, IVehicleState } from '../../store/models';

import ListData from './listData';
import { fetchHardwareDataPerGate } from '../../store/actions';

class ListDataContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		this.props.fetchData(this.props.gateKey).then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
		});
	}

	public render() {
		const { isLoaded } = this.state;
		const { locationKey, gate, data } = this.props;
		return <ListData {...{ gate, dataSource: data, loading: !isLoaded }} />;
	}
}

const formatVehicleData = (vehicleMap: object, vehicleList: IVehicleState) => {
	return Object.keys(vehicleMap)
		.map(key => {
			return {
				type: 'IU',
				data: key,
				driverCount:
					vehicleList[key] && vehicleList[key].drivers
						? vehicleList[key].drivers.length
						: 0,
				...vehicleMap[key]
			};
		})
		.filter(vehicle => !vehicle.removed);
};

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	locationKey: string;
	gateKey: string;
}

type ContainerProps = PropsFromDispatch & PropsFromState & OwnProps;

export type PresenterProps = PropsFromDispatch & {
	gates: IGateState;
	locationKey: string;
	loading: boolean;
};

const mapStateToProps = (state: RootState, props: OwnProps) => {
	const vehicleList = state.hardwareData[props.gateKey]
		? formatVehicleData(
				state.hardwareData[props.gateKey].vehicles_list,
				state.vehicles
		  )
		: [];

	return {
		gate: state.gates[props.locationKey][props.gateKey] || {},
		data: vehicleList
		// locationKey: props.locationKey
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		// fetchAllGates: (locationKey: string) => dispatch(fetchAllGate(locationKey))
		fetchData: (gateKey: string) => dispatch(fetchHardwareDataPerGate(gateKey))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ListDataContainer);
