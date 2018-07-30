import * as React from 'react';
import { withFormik, FormikProps, Form, Field, FieldArray } from 'formik';
import {
	Form as AntForm,
	Icon,
	Button,
	Divider,
	Row,
	Col,
	message
} from 'antd';
import { InjectedProps as withDatabaseInjectedProps } from '../../firebase/withFirebaseDatabase';

import {
	InputField
	// CheckBoxField,
	// SelectField
	// RadioGroupField,
	// SwitchField,
	// DatePickerField
} from '../../shared/ui/form';
import VehicleForm from './vehicleForm';
import { RouteComponentProps } from 'react-router';

const FormItem = AntForm.Item;

// @TODO
interface FormValues {
	[key: string]: any;
}

type Props = withDatabaseInjectedProps &
	RouteComponentProps<FormValues> & { userMatched: FormValues };

// interface Props extends withDatabaseInjectedProps
// interface Props {
//   submit: (
//     values: FormValues
//   ) => Promise<{
//     [key: string]: string;
//   } | null>;
// }

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
}: FormikProps<FormValues> & Props) => {
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
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="lastname"
					placeholder="Lastname"
					component={InputField}
				/>
			</FormItem>
			<FormItem>
				<Field
					label="Email"
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="email"
					placeholder="email"
					component={InputField}
				/>
			</FormItem>
			<Divider orientation="left">Vehicle's details</Divider>

			<FieldArray name="vehicles" component={VehicleForm} />
			<Divider />
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

// const vehiclesMockUp = [
// 	{
// 		model: 'clio',
// 		brand: 'renault',
// 		color: 'grey',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	},
// 	{
// 		model: 'clio',
// 		brand: 'renault',
// 		color: 'grey',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	},
// 	{
// 		model: 'clio',
// 		brand: 'renault',
// 		color: 'grey',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	},
// 	{
// 		model: 'clio',
// 		brand: 'renault',
// 		color: 'grey',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	},
// 	{
// 		model: 'clio',
// 		brand: 'renault',
// 		color: 'grey',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	},
// 	{
// 		model: 'bmw',
// 		brand: 'serie 1 ',
// 		color: 'black',
// 		iunumber: '',
// 		lpnumber: ''
// 	},
// 	{
// 		model: 'AMG',
// 		brand: 'mercedes',
// 		color: 'white',
// 		iunumber: '1987654321',
// 		lpnumber: 'ferigjeri'
// 	},
// 	{
// 		model: 'enzo',
// 		brand: 'ferari',
// 		color: 'red',
// 		iunumber: '1234567897',
// 		lpnumber: 'ferigjeriog54654'
// 	}
// ];
// console.log(vehiclesMockUp);

const DriverForm = withFormik<Props, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			firstname: props.userMatched ? props.userMatched.firstname : '',
			lastname: props.userMatched ? props.userMatched.lastname : '',
			email: props.userMatched ? props.userMatched.email : '',
			vehicles: props.userMatched ? props.userMatched.vehicles : []
		};
	},
	// Add a custom validation function (this can be async too!)
	validate: (values, props) => {
		const errors: any = {};
		// if (!values.firstname) {
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
			props: { userMatched, databaseAction, history },
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		console.log(values);
		if (userMatched) {
			// EDIT MODE
			console.log(userMatched);
			databaseAction.editUser(userMatched.key, values).then(userKey => {
				message.success('Driver edited');
				history.push('/driver/list');
			});
		} else {
			// NEW MODE
			databaseAction.addUser(values).then(userNewKey => {
				message.success('New driver added');
				history.push('/driver/list');
			});
		}
	}
})(InnerForm);

export default DriverForm;
