// - form handled by formik
// - style antdesign
// - submission to firebase database (rtd)

import * as React from 'react';
import { withFormik, FormikProps, Form, Field, FieldArray } from 'formik';
import { Form as AntForm, Icon, Button, Divider, Row, Col } from 'antd';
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
	// const vehicles = userMatched ? userMatched.vehicles : [212, 12];
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

			<FieldArray
				name="vehicles"
				component={VehicleForm}

				// tslint:disable-next-line:jsx-no-lambda
				// render = {arrayHelpers => (
				// 	<React.Fragment>
				// 						{vehicles.map((vehicle: any, index: number) => (
				// 							<React.Fragment key={`vehicle-${index}`} >
				// 							<VehicleForm key={`vehicle-${index}`} vehicleData={vehicle} />
				// 							<button
				//                   type="button"
				//                   onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
				//                 >
				//                   -
				//                 </button>
				// 								</React.Fragment>
				// 						))}
				// 						</React.Fragment>
				// )}
			/>

			{/* <FormItem>
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
			</FormItem> */}
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
						<Button type="danger">Cancel</Button>
					</Col>
				</Row>
			</FormItem>
		</Form>
	);
};

const vehiclesMockUp = [
	{
		model: 'clio',
		brand: 'renault',
		color: 'grey',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	},
	{
		model: 'clio',
		brand: 'renault',
		color: 'grey',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	},
	{
		model: 'clio',
		brand: 'renault',
		color: 'grey',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	},
	{
		model: 'clio',
		brand: 'renault',
		color: 'grey',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	},
	{
		model: 'clio',
		brand: 'renault',
		color: 'grey',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	},
	{
		model: 'bmw',
		brand: 'serie 1 ',
		color: 'black',
		iunumber: '',
		lpnumber: ''
	},
	{
		model: 'AMG',
		brand: 'mercedes',
		color: 'white',
		iunumber: '1987654321',
		lpnumber: 'ferigjeri'
	},
	{
		model: 'enzo',
		brand: 'ferari',
		color: 'red',
		iunumber: '1234567897',
		lpnumber: 'ferigjeriog54654'
	}
];
console.log(vehiclesMockUp);

const DriverForm = withFormik<
	withDatabaseInjectedProps & { userMatched: any },
	FormValues
>({
	enableReinitialize: true,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			firstname: props.userMatched ? props.userMatched.firstname : 'test',
			lastname: props.userMatched ? props.userMatched.lastname : '',
			email: props.userMatched ? props.userMatched.email : '',
			vehicles: props.userMatched ? props.userMatched.vehicles : []
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
		props.databaseAction.addUser(values).then(userNewKey => {
			// console.log(value);
			// values.vehicles.map((vehicle: any) => {
			// 	props.databaseAction.addVehicle({ driverID: userNewKey, ...vehicle });
			// });
		});
		props.databaseAction.getAllUsers().then(snapshot => {
			console.log(snapshot);
			// snapshot.forEach((element: any) => {
			// 	console.log(element.val());
			// });
		});
		// props.databaseAction
	}
})(InnerForm);

export default DriverForm;
