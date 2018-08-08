import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FieldProps, Field } from 'formik';

import { fetchAllGate } from '../../../store/actions';
import { IDriver, IVehicle } from '../../../store/models';
import { RootState } from '../../../store';
import GatesField from './presenter';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & PropsFromState & FieldProps<any>;

class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
	super(props);
		this.state = {
			isLoaded: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		this.props.fetchAllGates().then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
		});
	}

	public render() {
		const { isLoaded } = this.state;
		const { form, field, gatesData } = this.props;
		const onChangeSwitch = (key: string) => (checked: boolean) =>
			form.setFieldValue('gates', { ...form.values.gates, [key]: checked });
		return (
			<GatesField
				gates={gatesData}
				gatesValues={form.values.gates}
				loading={!isLoaded}
				onChangeSwitch={onChangeSwitch}
			/>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		gatesData: state.gates
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		fetchAllGates: () => dispatch(fetchAllGate())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
