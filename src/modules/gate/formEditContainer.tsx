import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {  editGate } from '../../store/actions';
import { RootState } from '../../store';
import EditForm from './formEdit';
import { IGate } from '../../store/models';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & PropsFromState & { gateKey: string };
export type PresenterProps = PropsFromDispatch &
	PropsFromState & { gateKey: string };

class FormContainer extends React.Component<ContainerProps, any> {
	public render() {
		return <EditForm {...this.props} />;
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		gate: state.gates[props.gateKey]
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		editGate: (gateKey: string, gateValues: IGate) =>
			dispatch(editGate(gateKey, gateValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
