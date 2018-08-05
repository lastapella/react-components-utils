import * as React from 'react';
import { message } from 'antd';
import * as _ from 'lodash';
import { ListContainerProps } from './container';
import ListPresenter from './presenter';
import { IAdministratorState } from '../../../store/models';

const ErrorEnum = {
	AUTH_USER_NOT_FOUND:
		'The administrator with the following ID is register in the database but not as a firebase user ',
	UNKNOWN: 'An unknown error occured',
	DEFAULT: 'There is an unknow error with the administrator with the ID : '
};

class ListUserContainer extends React.Component<ListContainerProps, any> {
	public constructor(props: ListContainerProps) {
		super(props);
		this.state = {
			isLoaded: false
		};
	}
	public componentDidMount() {
		this.fetchAllAdmins();
	}
	public fetchAllAdmins = () => {
		this.props
			.fetchAllAdministrator()
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
				this.setState(() => ({ isLoaded: true }));
			})
			.catch(err => {
				if (process.env.NODE_ENV !== 'production') {
					console.log(err);
				}
				message.error(ErrorEnum.UNKNOWN);
			});
	};
	public deleteRecord = (adminKey: string) => {
		this.props.deleteAdministrator(adminKey).then(operationResult => {
			if (operationResult.success) {
				message.success(operationResult.message);
			} else {
				message.error('An error occured');
			}
		});
	};

	public normalizeDataSource = (administratorsState: IAdministratorState) => {
		const keys = Object.keys(administratorsState);
		return keys.map(key => ({ key, ...administratorsState[key] }));
	};

	public render() {
		const { isLoaded } = this.state;
		const { administrators } = this.props;
		return (
			<ListPresenter
				dataSource={this.normalizeDataSource(administrators)}
				loading={!isLoaded}
				onDeleteRecord={this.deleteRecord}
			/>
		);
	}
}

export default ListUserContainer;
