import * as React from 'react';

import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
	fetchAllGate,
	deleteGate
} from '../../../store/actions';
import { RootState } from '../../../store';
import GatesFormList from './formList';
import FormAdd from './formAddContainer';
import { IGateState, IGate } from '../../../store/models';
import { Button, Row } from 'antd';

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

class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: ContainerProps) {
		super(props);
		this.state = {
			isLoaded: false,
			modalVisible: false
		};
	}

	public componentDidMount() {
		// fetch all gates
		this.props.fetchAllGates(this.props.locationKey).then(() => {
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
		const { locationKey } = this.props;
		return (
			<React.Fragment>
				<Row type="flex" justify="end" style={{ marginBottom: '10px' }}>
					<Button
						type="primary"
						icon="plus-circle-o"
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => this.handleShowModal()}
					>
						Add Gate
					</Button>
				</Row>
				<GatesFormList loading={!isLoaded} {...this.props} />{' '}
				<FormAdd
					locationKey={locationKey}
					modalVisible={modalVisible}
					// tslint:disable-next-line:jsx-no-lambda
					handleCloseModal={() => this.handleCloseModal()}
				/>
			</React.Fragment>
		);
	}
}

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
		deleteHandler: (locationKey: string, gateKey: string) =>
			dispatch(deleteGate(locationKey, gateKey))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
