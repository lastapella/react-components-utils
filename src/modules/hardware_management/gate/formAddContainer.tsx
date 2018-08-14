import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { addGate } from '../../../store/actions';
import { RootState } from '../../../store';
import AddForm from './formAdd';
import { IGate } from '../../../store/models';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	modalVisible: boolean;
	handleCloseModal: () => void;
	locationKey: string;
}

type ContainerProps = PropsFromDispatch & OwnProps;
export type PresenterProps = PropsFromDispatch & OwnProps;

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
		addGate: (locationKey: string, gateValues: IGate) => dispatch(addGate(locationKey, gateValues))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
