import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// import withFirebaseDatabase from '../../firebase/withFirebaseDatabase';
import {
	addAdministrator,
	fetchAdministrator,
	editAdministrator
} from '../../../store/actions';
import { IAdministrator } from '../../../store/models/administratorState';
import { RootState } from '../../../store';
import AdministratorForm from './adminForm';

type PropsFromDispatch = ReturnType<typeof mapDispatchToProps>;
type PropsFromState = ReturnType<typeof mapStateToProps>;
type OwnProps = RouteComponentProps<{ id: string }>;

type ContainerProps = PropsFromDispatch &
	PropsFromState & OwnProps;

export type PresenterProps = PropsFromDispatch &
	PropsFromState &
	RouteComponentProps<{ id: string }> & { administratorId?: string };

class FormContainer extends React.Component<ContainerProps, any> {
	public constructor(props: any) {
		super(props);
		this.state = {
			administratorId: undefined,
			isLoaded: false
		};
	}
	public retreiveAdministrator(idAdministratorFromRoute: string) {
		if (idAdministratorFromRoute && this.props.administrator) {
			this.setState(() => ({
				administratorId: idAdministratorFromRoute,
				isLoaded: true
			}));
		} else if (idAdministratorFromRoute) {
			this.props
				.fetchAdministrator(idAdministratorFromRoute)
				.then(administratorRetreived => {
					this.setState(() => ({
						administratorId: idAdministratorFromRoute,
						isLoaded: true
					}));
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log('TODO HANDLE ERR :: :', err);
					}
					this.setState(() => ({ isLoaded: true }));
				});
		}
	}
	public componentDidMount() {
		const idAdministratorFromRoute = this.props.match.params.id;
		if (idAdministratorFromRoute) {
			this.retreiveAdministrator(idAdministratorFromRoute);
		} else {
			this.setState(() => ({ isLoaded: true }));
		}
	}
	public componentDidUpdate(
		prevProps: PropsFromDispatch &
			PropsFromState &
			RouteComponentProps<{ id: string }>
	) {
		if (
			this.props.match.params.id &&
			this.props.location !== prevProps.location
		) {
			this.retreiveAdministrator(this.props.match.params.id);
		} else if (this.props.location !== prevProps.location) {
			this.setState(() => ({ administratorId: null, isLoaded: true }));
		}
	}
	public render() {
		const { isLoaded, administratorId } = this.state;
		return (
			<React.Fragment>
				{' '}
				{isLoaded ? (
					<AdministratorForm
						{...this.props}
						administratorId={administratorId}
					/>
				) : (
					<div> Loading ... </div>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: RootState, props: any) => {
	return { administrator: state.administrators[props.match.params.id] };
};
const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, void, Action>
) => {
	return {
		addAdministrator: (administratorValues: IAdministrator) =>
			dispatch(addAdministrator(administratorValues)),
		editAdministrator: (
			administratorKey: string,
			administratorValues: IAdministrator
		) => dispatch(editAdministrator(administratorKey, administratorValues)),
		fetchAdministrator: (administratorKey: string) =>
			dispatch(fetchAdministrator(administratorKey))
	};
};

export default connect<PropsFromState, PropsFromDispatch, OwnProps>(
	mapStateToProps,
	mapDispatchToProps
)(FormContainer);
