import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FieldProps, Field } from 'formik';

import {
	fetchAllLocation,
	deleteLocation,
	editLocation
} from '../../../store/actions';
import { RootState } from '../../../store';
// import GatesFormList from './formList';
import EditForm from './editForm';
import { ILocationState, ILocation } from '../../../store/models';
import { Button, Row, Tabs, Card } from 'antd';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch &
	PropsFromState & { locationKey: string };
export type PresenterProps = PropsFromDispatch &
	PropsFromState & { locationKey: string };

class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false,
			modalVisible: false
		};
	}

	public componentDidMount() {
		// fetch all locations
		this.props.fetchAllLocations().then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
		});
	}

	public handleCloseModal() {
		this.setState(() => ({ modalVisible: false }));
	}
	public handleShowModal() {
		this.setState(() => ({ modalVisible: true }));
	}

	public render() {
		const { isLoaded, modalVisible } = this.state;
		const { location } = this.props;
		return (
			<Card>
				<EditForm {...this.props} />{' '}
			</Card>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		location: state.locations[props.locationKey]
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		fetchAllLocations: () => dispatch(fetchAllLocation()),
		deleteHandler: (locationKey: string) =>
			dispatch(deleteLocation(locationKey)),
		editLocation: (locationKey: string, locationValues: ILocation) =>
			dispatch(editLocation(locationKey, locationValues))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
