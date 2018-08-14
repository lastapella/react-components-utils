import * as React from 'react';
import {
	withFormik,
	FormikProps,
	Form,
	Field /* , FieldProps */
} from 'formik';
import { Form as AntForm, Icon, Button, Row, Col, message } from 'antd';
// import adminValidationSchema from './validationSchema';
import { InputField } from '../../../shared/ui/form';
import { PresenterProps } from './formEditContainer';
// @TODO
interface FormValues {
	[key: string]: any;
}

const InnerForm = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	dirty,
	isSubmitting
}: FormikProps<FormValues> & PresenterProps) => {
	return (
		<Form
			className="gate-edit-form ant-form ant-form-horizontal"
			noValidate={true}
		>
			<Row type="flex" justify="space-between" align="middle">
				<Col xs={24} sm={24} md={18} lg={18}>
					<Row type="flex" justify="space-between" align="middle" gutter={8}>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="name"
								required={true}
								prefix={
									<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								name="name"
								placeholder="Name"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="Location"
								required={true}
								prefix={
									<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								name="location"
								placeholder="Location"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="IP Address"
								required={true}
								prefix={
									<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								name="ipaddress"
								placeholder="IP Address"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="Description"
								isTextArea={true}
								row={4}
								required={true}
								prefix={
									<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								name="description"
								placeholder="Description"
								component={InputField}
							/>
						</Col>
					</Row>
				</Col>
				<Col>
					{dirty && (
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
							loading={isSubmitting}
						>
							Save
						</Button>
					)}
				</Col>
			</Row>
		</Form>
	);
};

const GateForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			name: props.gate ? props.gate.name : '',
			location: props.gate ? props.gate.location : '',
			ipaddress: props.gate ? props.gate.ipaddress : '',
			description: props.gate ? props.gate.description : ''
		};
	},
	// validationSchema: driverValidationSchema,
	// Add a custom validation function (this can be async too!)
	// validate: (values, props) => {
	// 	const errors: any = {};
	// 	const iunumberList: string[] = values.vehicles.map(
	// 		(vehicle: any) => vehicle.iunumber
	// 	);
	// 	const iunumberInError = iunumberList.map(
	// 		(value, index, self) => (self.indexOf(value) !== index ? index : null)
	// 	);
	// 	iunumberInError.forEach(vehicleIndex => {
	// 		if (vehicleIndex !== null) {
	// 			errors.vehicles = {
	// 				[vehicleIndex]: { iunumber: IU_NUMBER_MUST_BE_UNIQUE }
	// 			};
	// 		}
	// 	});
	// 	return errors;
	// },
	// Submission handler
	handleSubmit: (
		values,
		{
			props: { gateKey, editGate, locationKey },
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		editGate(locationKey, gateKey, values).then(() => {
			message.success('Gate Edited');
			setSubmitting(false);
		});
	}
})(InnerForm);

export default GateForm;
