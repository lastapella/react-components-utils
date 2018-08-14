import { connect /* DispatchProps */ } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../store';
import {
	fetchAllAdministrator,
	deleteAdministrator
} from '../../../store/actions';
import ListComponent from './listContainer';

// export default withFirebaseDatabase(ListComponent);

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	[key: string]: any;
}

export type ListContainerProps = PropsFromDispatch & PropsFromState;

const mapStateToProps = (state: RootState) => {
	return { administrators: state.administrators };
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		deleteAdministrator: (administratorKey: string) =>
			dispatch(deleteAdministrator(administratorKey)),
		fetchAllAdministrator: () => dispatch(fetchAllAdministrator())
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ListComponent);
