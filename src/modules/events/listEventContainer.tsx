import * as React from 'react';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { RootState } from '../../store';
import { IGateState } from '../../store/models';
import { fetchAllGate } from '../../store/actions';

import ListEvent from './listEvent'

class ListsEventContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		this.props.fetchEvents(this.props.gateKey).then(() => {
			this.setState(() => ({
				isLoaded: true
			}));
		});
	}

	public render() {
		const { isLoaded } = this.state;
		const { locationKey, gate , events} = this.props;
		return (
			<ListEvent {...{ gate, dataSource: events, loading: !isLoaded}} />
		);
	}
}

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
interface OwnProps {
  locationKey: string;
  gateKey: string
}


type ContainerProps = PropsFromDispatch & PropsFromState & OwnProps;

export type PresenterProps = PropsFromDispatch & {
	gates: IGateState;
	locationKey: string;
	loading: boolean;
};

const mapStateToProps = (state: RootState, props: OwnProps) => {
	return {
    gate: state.gates[props.locationKey][props.gateKey] || {},
    events : []
		// locationKey: props.locationKey
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
    // fetchAllGates: (locationKey: string) => dispatch(fetchAllGate(locationKey))
    fetchEvents: (gateKey: string) => Promise.resolve(console.log('FETCH EVENT for gate : '+ gateKey))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(ListsEventContainer);
