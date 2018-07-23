// - form handled by formik
// - style antdesign
// - submission to firebase database (rtd)

import * as React from 'react';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Form as AntForm, Icon, Button, Divider, Row, Col } from 'antd';
import { InjectedProps as withDatabaseInjectedProps } from '../../shared/HOC/firebase/withFirebaseDatabase';

import {
	InputField,
	// CheckBoxField,
	SelectField
	// RadioGroupField,
	// SwitchField,
	// DatePickerField
} from '../../shared/ui/form';

const FormItem = AntForm.Item;

interface FormValues {
	record?: any;
	[key: string]: string;
}

// interface Props extends withDatabaseInjectedProps
// interface Props {
//   submit: (
//     values: FormValues
//   ) => Promise<{
//     [key: string]: string;
//   } | null>;
// }

// const genderValues = [
// 	{ value: 'M', label: 'Male' },
// 	{
// 		value: 'F',
// 		label: 'Female'
// 	},
// 	{
// 		value: 'O',
// 		label: 'Other'
// 	}
// ];

const InnerForm = ({
	userMatched,
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	isSubmitting
}: { userMatched: any } & FormikProps<FormValues> &
	withDatabaseInjectedProps) => {
	return (
		<Form className="login-form">
			<Divider orientation="left">Drivers's Particulars</Divider>
			<FormItem>
				<Field
					label="firstname"
					required={true}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="firstname"
					placeholder="Firstname"
					component={InputField}
				/>
			</FormItem>
			<FormItem>
				<Field
					label="Lastname"
					prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="lastname"
					placeholder="Lastname"
					component={InputField}
				/>
			</FormItem>
			<Divider orientation="left">Vehicle's details</Divider>
			<FormItem>
				<Field
					name="carBrand"
					label="Car brand:"
					placeholder="Select the brand of your car"
					component={SelectField}
				>
					<option value="bmw">BMW</option>
					<option value="mercedes">MERCEDES</option>
					<option value="renault">RENAULT</option>
					<option value="honda">HONDA</option>
					<option value="toyota">TOYOTA</option>
				</Field>
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
						<Button type="danger">Cancel</Button>
					</Col>
				</Row>
			</FormItem>
		</Form>
	);
};

const MyForm = withFormik<
	withDatabaseInjectedProps & { userMatched: any },
	FormValues
>({
	enableReinitialize: true,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			firstname: props.userMatched ? props.userMatched.firstname : 'test',
			lastname: props.userMatched ? props.userMatched.lastname : '',
			carBrand: props.userMatched ? props.userMatched.carBrand : ''
		};
	},
	// Add a custom validation function (this can be async too!)
	validate: (values, props) => {
		const errors: any = {};
		if (!values.firstname) {
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
			props,
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		console.log(values);
		console.log(props);
		props.databaseAction.addUser(values);
		props.databaseAction.readUsers().then(snapshot => {
			console.log(snapshot);
			// snapshot.forEach((element: any) => {
			// 	console.log(element.val());
			// });
		});
		// props.databaseAction
	}
})(InnerForm);

export default MyForm;
