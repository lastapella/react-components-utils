import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { addLocation } from '../../../store/actions';
import { RootState } from '../../../store';
import AddForm from './addForm';
import { ILocation } from '../../../store/models';

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
		addLocation: (locationValues: ILocation) => dispatch(addLocation(locationValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
