import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { addGate } from '../../../store/actions';
import { RootState } from '../../../store';
import AddForm from './formAdd';
import { IGate } from '../../../store/models';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
// type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & {
	modalVisible: boolean;
	handleCloseModal: () => void;
};
export type PresenterProps = PropsFromDispatch & {
	modalVisible: boolean;
	handleCloseModal: () => void;
};

class FormContainer extends React.Component<ContainerProps, any> {
	public render() {
		return <AddForm {...this.props} />;
	}
}
const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		addGate: (gateValues: IGate) => dispatch(addGate(gateValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
