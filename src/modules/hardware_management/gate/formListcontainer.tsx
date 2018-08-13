import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { FieldProps, Field } from 'formik';

import {
	fetchAllGate,
	addGate,
	editGate,
	deleteGate
} from '../../../store/actions';
import { RootState } from '../../../store';
import GatesFormList from './formList';
import FormAdd from './formAddContainer';
import { IGateState, IGate } from '../../../store/models';
import { Button, Row } from 'antd';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;

type ContainerProps = PropsFromDispatch & PropsFromState & FieldProps<any>;

export type PresenterProps = PropsFromDispatch & {
	gates: IGateState;
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
		this.props.fetchAllGates().then(() => {
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
		const { gates } = this.props;
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
				<GatesFormList gates={gates} loading={!isLoaded} {...this.props} />{' '}
				<FormAdd
					modalVisible={modalVisible}
					// tslint:disable-next-line:jsx-no-lambda
					handleCloseModal={() => this.handleCloseModal()}
				/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return {
		gates: state.gates
	};
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		fetchAllGates: () => dispatch(fetchAllGate()),
		deleteHandler: (gateKey: string) => dispatch(deleteGate(gateKey))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
