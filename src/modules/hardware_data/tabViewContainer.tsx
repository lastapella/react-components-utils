import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FieldProps, Field } from 'formik';

import { fetchAllLocation, deleteLocation } from '../../store/actions';
import { RootState } from '../../store';
import TabView from './tabView';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & PropsFromState & FieldProps<any>;
export type PresenterProps = PropsFromState & {
};
interface OwnProps {
	[key: string]: any;
}

class TabViewContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false,
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

	public render() {
		const { isLoaded, modalVisible } = this.state;
		const { locations } = this.props;
		return (
			<React.Fragment>
				{/* <Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
					<Button
						type="primary"
						icon="plus-circle-o"
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => this.handleShowModal()}
					>
						Add Location
					</Button>
        </Row> */}
				<TabView
					locations={locations}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		locations: state.locations
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		fetchAllLocations: () => dispatch(fetchAllLocation()),
		deleteHandler: (locationKey: string) =>
			dispatch(deleteLocation(locationKey))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(TabViewContainer);
