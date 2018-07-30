import * as React from 'react';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Form as AntForm, Icon, Button, Divider, Row, Col } from 'antd';
import { InjectedProps as withDatabaseInjectedProps } from '../../../firebase/withFirebaseDatabase';

import {
	InputField
	// CheckBoxField,
	// SelectField
	// RadioGroupField,
	// SwitchField,
	// DatePickerField
} from '../../../shared/ui/form';

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
}: { adminMatched: any } & FormikProps<FormValues> &
	withDatabaseInjectedProps ) => {
	return (
		<Form className="login-form">
			<Divider orientation="left">Administrators Details</Divider>
			<FormItem>
				<Field
					label="Display Name"
					required={true}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="displayName"
					placeholder="Display Name"
					component={InputField}
				/>
			</FormItem>
			<FormItem>
				<Field
					label="Email"
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="email"
					placeholder="Email"
					component={InputField}
				/>
			</FormItem>
			<FormItem>
				<Field
					label="Password"
					type="password"
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="password"
					placeholder="Password"
					component={InputField}
				/>
			</FormItem>
			<FormItem>
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
			</FormItem>
		</Form>
	);
};

const AdminForm = withFormik<
	withDatabaseInjectedProps & { adminMatched: any },
	FormValues
>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		console.log(props);
		return {
			displayName: props.adminMatched
				? props.adminMatched.displayName
				: 'fozjfiezjfleznl',
			email: props.adminMatched
				? props.adminMatched.email
				: 'fezjfpezko@ezkfj.code',
			emailVerified: props.adminMatched
				? props.adminMatched.emailVerified
				: false,
			phoneNumber: props.adminMatched ? props.adminMatched.phoneNumber : null,
			photoURL: props.adminMatched ? props.adminMatched.photoURL : null,
			disabled: props.adminMatched ? props.adminMatched.disabled : false,
			password: props.adminMatched ? props.adminMatched.password : null,
			uid: props.adminMatched ? props.adminMatched.uid : '123456468768'
		};
	},
	// Add a custom validation function (this can be async too!)
	validate: (values, props) => {
		const errors: any = {};
		if (!values.email) {
			errors.email = 'Required';
		}
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
			props: { adminMatched, databaseAction },
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {

		if (adminMatched) {
			// EDIT MODE
			// console.log(adminMatched);
			// databaseAction.editUser(adminMatched.key, values);
		} else {
			// NEW MODE
			// databaseAction.addUser(values);
		}
	}
})(InnerForm);

export default AdminForm;
