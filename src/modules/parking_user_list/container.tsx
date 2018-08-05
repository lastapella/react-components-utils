import { connect /* DispatchProps */ } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IDriver } from '../../store/models/driverState';
import { RootState } from '../../store';
import { fetchAllDriver, deleteDriver, syncVehicles } from '../../store/actions';
import ListComponent from './listContainer';

// export default withFirebaseDatabase(ListComponent);

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

export type ListContainerProps = PropsFromDispatch & PropsFromState

const mapStateToProps = (state: RootState) => {
	return { drivers: state.drivers };
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		deleteDriver: (driverKey: string) => dispatch(deleteDriver(driverKey)),
    fetchAllDriver: () => dispatch(fetchAllDriver()),
    syncVehicles: ()=> dispatch(syncVehicles())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ListComponent);
