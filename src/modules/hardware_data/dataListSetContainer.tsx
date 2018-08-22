import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { RootState } from '../../store';
import { IGateState } from '../../store/models';
import { fetchAllGate, fetchAllVehicles } from '../../store/actions';
import ListData from './listDataContainer';

class ListsDataContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		this.props.fetchAllGates(this.props.locationKey).then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
    });
    this.props.fetchAllVehicles();
	}

	public render() {
		const { isLoaded } = this.state;
		const { locationKey, gates } = this.props;
		return (
			<Row type="flex" gutter={8}>
				{Object.keys(gates).map((gateKey, index) => (
					<Col key={index} xs={24} sm={24} md={24} lg={12}>
						<ListData {...{ gateKey, locationKey }} />
					</Col>
				))}
			</Row>
		);
	}
}

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
	locationKey: string;
}

type ContainerProps = PropsFromDispatch & PropsFromState & OwnProps;

export type PresenterProps = PropsFromDispatch & {
	gates: IGateState;
	locationKey: string;
	loading: boolean;
};

const mapStateToProps = (state: RootState, props: OwnProps) => {
	return {
		gates: state.gates[props.locationKey] || {},
		locationKey: props.locationKey
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
    fetchAllGates: (locationKey: string) => dispatch(fetchAllGate(locationKey)),
    fetchAllVehicles: () => dispatch(fetchAllVehicles())
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ListsDataContainer);
