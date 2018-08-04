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
import { RouteComponentProps } from 'react-router';
import { InjectedProps as withDatabaseInjectedProps } from '../../../firebase/withFirebaseDatabase';
import {
	InjectedProps as withAdminFunctionInjectedProps,
	functionsResponseWithError
} from '../../../firebase/withFirebaseAdminFunctions';
import adminValidationSchema from './validationSchema';
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
import { PresenterProps } from './container';
const FormItem = AntForm.Item;

// @TODO
interface FormValues {
	[key: string]: any;
}

// interface Props extends withDatabaseInjectedProps
// interface Props {
//   submit: (
//     values: FormValues
//   ) => Promise<{
//     [key: string]: string;
//   } | null>;
// }

const InnerForm = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	isSubmitting,
	history
}: FormikProps<FormValues> & PresenterProps) => {
	const onCancel = () => {
		message.warn('Form Edition Canceled');
		history.push('/administrators/list');
	};
	return (
		<Form className="login-form" noValidate={true}>
			<Divider orientation="left">Administrators Details</Divider>
			<Field
				label="Display Name"
				required={true}
				prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="displayName"
				placeholder="Display Name"
				component={InputField}
			/>
			<Field
				label="Email"
				required={true}
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
						loading={isSubmitting}
					>
						Submit
					</Button>
				</Col>
				<Col>
					<Button onClick={onCancel} type="danger" ghost={true}>
						Cancel
					</Button>
				</Col>
			</Row>
		</Form>
	);
};

const AdminForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			displayName: props.administrator ? props.administrator.displayName : '',
			email: props.administrator ? props.administrator.email : '',
			emailVerified: props.administrator
				? props.administrator.emailVerified
				: false,
			phoneNumber: props.administrator ? props.administrator.phoneNumber : null,
			photoURL: props.administrator ? props.administrator.photoURL : null,
			disabled: props.administrator ? props.administrator.disabled : false,
			password: props.administrator ? props.administrator.password : '',
			uid: props.administrator ? props.administrator.uid : '',
			role: props.administrator ? props.administrator.role : []
		};
	},
	validationSchema: adminValidationSchema,
	// Add a custom validation function (this can be async too!)
	// validate: (values, props) => {
	// 	const errors: any = {};
	// 	// if (!values.email) {
	// 	// 	errors.email = 'Required';
	// 	// }
	// 	// else if (
	// 	// 	!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
	// 	// ) {
	// 	// 	errors.email = 'Invalid email address';
	// 	// }
	// 	return errors;
	// },
	// Submission handler
	handleSubmit: (
		values,
		{
			props: {
				administratorId,
				administrator,
				editAdministrator,
				addAdministrator,
				history
			},
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {

		if (administrator && administratorId) {
			// EDIT MODE
			editAdministrator(administratorId, values)
				.then(res => {
					const errorMessage = functionsResponseWithError(res.data);
					if (errorMessage) {
						message.error(errorMessage);
						setSubmitting(false);
					} else {
						message.success('Administrator edited');
						history.push('/administrators/list');
					}
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log(err);
					}
					message.error('An unknown error occured');
					setSubmitting(false);
				});
		} else {
			// NEW MODE
			// databaseAction.addUser(values);

			addAdministrator(values)
				.then(res => {
					console.log(res);
					const errorMessage = functionsResponseWithError(res.data);
					if (errorMessage) {
						message.error(errorMessage);
						setSubmitting(false);
					} else {
						message.success('New administrator added');
						history.push('/administrators/list');
					}
				})
				.catch(err => {
					if (process.env.NODE_ENV !== 'production') {
						console.log(err);
					}
					message.error('An unknown error occured');
					setSubmitting(false);
				});
		}
	}
})(InnerForm);

export default AdminForm;
