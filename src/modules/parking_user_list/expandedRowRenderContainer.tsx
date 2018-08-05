import { connect } from 'react-redux';
import { RootState } from '../../store';
import Presenter from './expandedRowRenderPresenter';

type PropsFromState = ReturnType<typeof mapStateToProps>;
export type PresenterProps = PropsFromState;

interface Props {
	vehicles: [string];
}

const mapStateToProps = (state: RootState, props: Props) => {
	const vehiclesKey = props.vehicles || [];
	const driverVehicles = vehiclesKey.map(
		vehicleKey => (state.vehicles[vehicleKey] ? state.vehicles[vehicleKey] : {})
	);
	return {
		vehicles: driverVehicles
	};
};

export default connect(
	mapStateToProps
	// mapDispatchToProps
)(Presenter);
