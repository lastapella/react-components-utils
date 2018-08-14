import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FieldProps, Field } from 'formik';

import { fetchAllGate, fetchAllLocation } from '../../../store/actions';
import {
	IDriver,
	IVehicle,
	ILocationState,
	IGateState
} from '../../../store/models';
import { RootState } from '../../../store';
import GatesField from './presenter';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	[key: string]: any;
}
type ContainerProps = PropsFromDispatch & PropsFromState & FieldProps<any>;
export interface PresenterProps {
	locations: ILocationState;
	gates: IGateState;
	gatesValues: any;
	loading: boolean;
	onChangeSwitch: (
		locationKey: string,
		gateKey: string
	) => (checked: boolean) => void;
}
class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		Promise.all([
			this.props.fetchAllGates(),
			this.props.fetchAllLocations()
		]).then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
		});
	}

	public render() {
		const { isLoaded } = this.state;
		const { form, field, gatesData, locations } = this.props;
		const onChangeSwitch = (locationKey: string, gateKey: string) => (
			checked: boolean
		) =>
			form.setFieldValue('gates', {
				...form.values.gates,
				[locationKey]: { ...form.values.gates[locationKey], [gateKey]: checked }
			});
		return (
			<GatesField
				locations={locations}
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
		gatesData: state.gates,
		locations: state.locations
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		fetchAllGates: () => dispatch(fetchAllGate()),
		fetchAllLocations: () => dispatch(fetchAllLocation())
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
