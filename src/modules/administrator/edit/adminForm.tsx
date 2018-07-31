import * as React from 'react';
import {
	withFormik,
	FormikProps,
	Form,
	Field /* , FieldProps */
} from 'formik';
import {
	Form as AntForm,
	Icon,
	Button,
	Divider,
	Row,
	Col,
	Switch,
	message
} from 'antd';
import { InjectedProps as withDatabaseInjectedProps } from '../../../firebase/withFirebaseDatabase';
import { InjectedProps as withAdminFunctionInjectedProps } from '../../../firebase/withFirebaseAdminFunctions';

import {
	InputField,
	SwitchField,
	SelectField
	// CheckBoxField,
	// SelectField
	// RadioGroupField,
	// SwitchField,
	// DatePickerField
} from '../../../shared/ui/form';
import { RouteComponentProps } from 'react-router';

const FormItem = AntForm.Item;

// @TODO
interface FormValues {
	[key: string]: any;
}

type Props = withAdminFunctionInjectedProps &
	withDatabaseInjectedProps &
	RouteComponentProps<FormValues> & { adminMatched: FormValues };
// interface Props extends withDatabaseInjectedProps
// interface Props {
//   submit: (
//     values: FormValues
//   ) => Promise<{
//     [key: string]: string;
//   } | null>;
// }

const InnerForm = ({
	adminMatched,
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	isSubmitting
}: FormikProps<FormValues> & Props) => {
	return (
		<Form className="login-form" noValidate={true}>
			<Divider orientation="left">Administrators Details</Divider>
			<Field
				label="Display Name"
				required={true}
				noValidate={true}
				prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="displayName"
				placeholder="Display Name"
				component={InputField}
			/>
			<Field
				label="Email"
				required={true}
				noValidate={true}
				prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="email"
				placeholder="Email"
				component={InputField}
			/>
			<Field
				label="Password"
				type="password"
				prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="password"
				placeholder="Password"
				component={InputField}
			/>
			<Field
				label="Phone Number"
				prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="phoneNumber"
				placeholder="Phone Number"
				component={InputField}
			/>
			<Field
				label="Profile picture"
				prefix={<Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="photoURL"
				placeholder="Profile Picture"
				component={InputField}
			/>
			<Field
				label="Role"
				name="role"
				mode="multiple"
				// defaultValue={["NORMAL_ADMIN"]}// <= it seems it doenst work
				component={SelectField}
			>
				<option value="SUPER_ADMIN">Super admin</option>
				<option value="NORMAL_ADMIN">Normal admin (default)</option>
				<option value="GUARD">Guard</option>
				<option value="OTHER">Other</option>
			</Field>
			<Field label="Disabled?" name="disabled" component={SwitchField} />

			<Row type="flex" justify="center" gutter={48}>
				<Col>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Submit
					</Button>
				</Col>
				<Col>
					<Button type="danger" ghost={true}>
						Cancel
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

const AdminForm = withFormik<
	withDatabaseInjectedProps &
		withAdminFunctionInjectedProps & { adminMatched: any },
	FormValues
>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		console.log(props);
		return {
			displayName: props.adminMatched ? props.adminMatched.displayName : '',
			email: props.adminMatched ? props.adminMatched.email : '',
			emailVerified: props.adminMatched
				? props.adminMatched.emailVerified
				: false,
			phoneNumber: props.adminMatched ? props.adminMatched.phoneNumber : null,
			photoURL: props.adminMatched ? props.adminMatched.photoURL : null,
			disabled: props.adminMatched ? props.adminMatched.disabled : true,
			password: props.adminMatched ? props.adminMatched.password : null,
			uid: props.adminMatched ? props.adminMatched.uid : '',
			role: props.adminMatched ? props.adminMatched.role : []
		};
	},
	// Add a custom validation function (this can be async too!)
	validate: (values, props) => {
		const errors: any = {};
		// if (!values.email) {
		// 	errors.email = 'Required';
		// }
		// else if (
		// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		// ) {
		// 	errors.email = 'Invalid email address';
		// }
		return errors;
	},
	// Submission handler
	handleSubmit: (
		values,
		{
			props: { adminMatched, databaseAction, functions },
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		// functions.helloWord();
		console.log(values);

		if (adminMatched) {
			// EDIT MODE
			// console.log(adminMatched);
			// databaseAction.editUser(adminMatched.key, values);
			functions.updateAdmin(values);
		} else {
			// NEW MODE
			// databaseAction.addUser(values);
			functions.addAdmin(values);

		}
	}
})(InnerForm);

export default class FormWithRecord extends React.Component<
	withDatabaseInjectedProps &
		withAdminFunctionInjectedProps &
		RouteComponentProps<{ id: string }>,
	any
> {
	public constructor(props: any) {
		super(props);
		console.log(props);
		this.state = {
			admin: undefined,
			isLoaded: false
		};
	}
	public componentDidMount() {
		if (this.props.match.params.id) {
			this.props.functions
				.getAdmin({ uid: this.props.match.params.id })
				.then(admin => {
					this.setState(() => ({ admin: admin.data, isLoaded: true }));
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log(err);
					}
					message.error('An unknown error occured');
					this.setState(() => ({ isLoaded: true }));
				});
		} else {
			this.setState(() => ({ isLoaded: true }));
		}
	}
	public componentDidUpdate(
		prevProps: withDatabaseInjectedProps &
			withAdminFunctionInjectedProps &
			RouteComponentProps<{ id: string }>
	) {
		if (
			this.props.match.params.id &&
			this.props.location !== prevProps.location
		) {
			this.props.functions
				.getAdmin({ uid: this.props.match.params.id })
				.then(admin => {
					this.setState(() => ({ admin: admin.data, isLoaded: true }));
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log(err);
					}
					message.error('An unknown error occured');
					this.setState(() => ({ isLoaded: true }));
				});
		} else if (this.props.location !== prevProps.location) {
			this.setState(() => ({ admin: null, isLoaded: true }));
		}
	}
	public render() {
		const { isLoaded, admin } = this.state;
		return (
			<React.Fragment>
				{' '}
				{isLoaded ? (
					<AdminForm
						adminMatched={admin}
						databaseAction={this.props.databaseAction}
						functions={this.props.functions}
						{...this.props}
					/>
				) : (
					<div> Loading ... </div>
				)}
			</React.Fragment>
		);
	}
}
