import * as React from 'react';
import withFirebaseAdminFunctions, {
	InjectedProps as withAdminFunctionsInjectedProps
} from '../../../firebase/withFirebaseAdminFunctions';
import { message } from 'antd';
import ListPresenter from './presenter';
import * as _ from 'lodash';

const ErrorEnum = {
	AUTH_USER_NOT_FOUND:
		'The administrator with the following ID is register in the database but not as a firebase user ',
	UNKNOWN: 'An unknown error occured',
	DEFAULT: 'There is an unknow error with the administrator with the ID : '
};

class ListUserContainer extends React.Component<
	withAdminFunctionsInjectedProps,
	any
> {
	public constructor(props: withAdminFunctionsInjectedProps) {
		super(props);
		this.state = {
			administrators: [],
			isLoaded: false
		};
	}
	public componentDidMount() {
		this.fetchAdmins();
	}
	public fetchAdmins = () => {
		const { functions } = this.props;
		console.log(process.env);
		functions
			.getAllAdmins()
			.then(adminsResponse => {
				const [admins, adminsInError] = _.partition(
					adminsResponse.data,
					admin => !admin.error
				);
				adminsInError.forEach(adminError =>
					message.warning(
						(ErrorEnum[adminError.error] || ErrorEnum.DEFAULT) +
							(adminError.userId || 'unknown'),
						5
					)
				);
				this.setState(() => ({ administrators: admins, isLoaded: true }));
			})
			.catch(err => {
				if (process.env.NODE_ENV !== 'production') {
					console.log(err);
				}
				message.error(ErrorEnum.UNKNOWN);
			});
	};
	public deleteRecord = (adminKey: string) => {
		const { functions } = this.props;
		functions
			.deleteAdmin({uid: adminKey})
			.then(() => this.fetchAdmins())
			.catch(err => console.log('TODO HANDLE ERR', err));
	};
	public render() {
		const { administrators, isLoaded } = this.state;
		return (
			<ListPresenter
				dataSource={administrators}
				loading={!isLoaded}
				onDeleteRecord={this.deleteRecord}
			/>
		);
	}
}

export default withFirebaseAdminFunctions(ListUserContainer);
