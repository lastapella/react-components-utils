import * as React from 'react';
import { withFormik, FormikProps, Form, Field, FieldArray } from 'formik';
import {
	// Form as AntForm,
	Icon,
	Button,
	Divider,
	Row,
	Col,
	message
} from 'antd';
import { RouteComponentProps } from 'react-router';
import { InjectedProps as withDatabaseInjectedProps } from '../../firebase/withFirebaseDatabase';
import driverValidationSchema from './validationSchema';
import {
	InputField
	// CheckBoxField,
	// SelectField
	// RadioGroupField,
	// SwitchField,
	// DatePickerField
} from '../../shared/ui/form';
import VehicleForm from './vehicleForm';
import { PresenterProps } from './container';
import { IDriver, IVehicle } from '../../store/models';
import { IU_NUMBER_MUST_BE_UNIQUE } from '../../constants/validationMessages';

// const FormItem = AntForm.Item;

// // @TODO
interface FormValues {
	[key: string]: any;
}

const InnerForm = ({
	driver,
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	isSubmitting,
	history,
	location
}: FormikProps<FormValues> & PresenterProps) => {
	const onCancel = () => {
		message.warn('Form Edition Canceled');
		history.push('/drivers/list');
	};
	return (
		<Form className="login-form" noValidate={true}>
			<Divider orientation="left">Drivers's Particulars</Divider>
			<Field
				label="firstname"
				required={true}
				prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="firstname"
				placeholder="Firstname"
				component={InputField}
			/>
			<Field
				label="Lastname"
				required={true}
				prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="lastname"
				placeholder="Lastname"
				component={InputField}
			/>
			<Field
				label="Email"
				required={true}
				prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
				name="email"
				placeholder="email"
				component={InputField}
			/>
			<Divider orientation="left">Vehicle's details</Divider>

			<FieldArray name="vehicles" component={VehicleForm} />
			<Divider />
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

const DriverForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			firstname: props.driver ? props.driver.firstname : '',
			lastname: props.driver ? props.driver.lastname : '',
			email: props.driver ? props.driver.email : '',
			vehicles: props.vehicles ? props.vehicles : []
		};
	},
	validationSchema: driverValidationSchema,
	// Add a custom validation function (this can be async too!)
	validate: (values, props) => {
		const errors: any = {};
		const iunumberList: string[] = values.vehicles.map(
			(vehicle: any) => vehicle.iunumber
		);
		const iunumberInError = iunumberList.map(
			(value, index, self) => (self.indexOf(value) !== index ? index : null)
		);
		iunumberInError.forEach(vehicleIndex => {
			if (vehicleIndex !== null) {
				errors.vehicles = {
					[vehicleIndex]: { iunumber: IU_NUMBER_MUST_BE_UNIQUE }
				};
			}
		});
		return errors;
	},
	// Submission handler
	handleSubmit: (
		values,
		{
			props: {
				driverId,
				driver,
				history,
				editDriver,
				addDriver,
				addOrUpdateVehiclesList
			},
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		const driverValues = {
			...values,
			vehicles: values.vehicles.map((vehicle: any) => vehicle.iunumber)
		};
		const vehiclesValues = values.vehicles;
		if (driver && driverId) {
			// EDIT MODE
			const vehicleKeysRemoved = driver.vehicles
				? driver.vehicles.filter(
						vehiclekey =>
							driverValues.vehicles
								? !driverValues.vehicles.includes(vehiclekey)
								: true
				  )
				: [];

			editDriver(driverId, driverValues).then(driverKey => {
				addOrUpdateVehiclesList(
					vehiclesValues,
					driverKey,
					vehicleKeysRemoved
				).then(() => {
					message.success('Driver edited');
					history.push('/drivers/list');
				});
			});
		} else {
			// NEW MODE
			addDriver(driverValues).then(driverNewKey => {
				addOrUpdateVehiclesList(vehiclesValues, driverNewKey).then(() => {
					message.success('New driver added');
					history.push('/drivers/list');
				});
			});
		}
	}
})(InnerForm);

export default DriverForm;
