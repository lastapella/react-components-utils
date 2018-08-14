import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { editGate } from '../../../store/actions';
import { RootState } from '../../../store';
import EditForm from './formEdit';
import { IGate } from '../../../store/models';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	gateKey: string;
	locationKey: string;
}

type ContainerProps = PropsFromDispatch & PropsFromState & OwnProps;
export type PresenterProps = PropsFromDispatch & PropsFromState & OwnProps;

class FormContainer extends React.Component<ContainerProps, any> {
	public render() {
		return <EditForm {...this.props} />;
	}
}

const mapStateToProps = (state: RootState, props: OwnProps) => {
	return {
		gate: state.gates[props.locationKey][props.gateKey],
		location: state.locations[props.locationKey]
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		editGate: (locationKey: string, gateKey: string, gateValues: IGate) =>
			dispatch(editGate(locationKey, gateKey, gateValues))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
