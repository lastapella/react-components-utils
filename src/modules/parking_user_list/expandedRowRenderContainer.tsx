import { connect } from 'react-redux';
import { RootState } from '../../store';
import Presenter from './expandedRowRenderPresenter';

type PropsFromState = ReturnType<typeof mapStateToProps>;
type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
interface OwnProps {
	[key:string] :any
}
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

const mapDispatchToProps = () => {
	return {}
}

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(Presenter);
