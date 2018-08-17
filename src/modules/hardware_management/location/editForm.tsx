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
import { PresenterProps } from './editFormContainer';
import { InputNumberField } from '../../../shared/ui/form/InputNumberField';
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
	isSubmitting,
	dirty
}: FormikProps<FormValues> & PresenterProps) => {
	return (
		<Form
			className="location-edit-form ant-form ant-form-horizontal"
			noValidate={true}
		>
			<Row type="flex" justify="space-between" align="middle">
				<Col xs={24} sm={24} md={18} lg={18}>
					<Row type="flex" justify="space-between" align="middle" gutter={8}>
						<Col xs={24} sm={24} md={12} lg={8}>
							<Field
								label="name"
								required={true}
								prefix={
									<Icon
										type="info-circle-o"
										style={{ color: 'rgba(0,0,0,.25)' }}
									/>
								}
								name="name"
								placeholder="Name"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={8}>
							<Field
								label="Capacity of connected Hardware devices"
								required={true}
								min={0}
								name="connectHWCapacity"
								placeholder="Capacity of connected Hardware devices"
								component={InputNumberField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={8}>
							<Field
								label="IP Address/URL"
								required={true}
								prefix={
									<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />
								}
								name="url"
								placeholder="IP Address/URL"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Field
								label="Address"
								isTextArea={true}
								row={4}
								name="address"
								placeholder="Address"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={12}>
							<Field
								label="Description"
								isTextArea={true}
								row={4}
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
							Save Changes
						</Button>
					)}
				</Col>
			</Row>
		</Form>
	);
};

const LocationForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			name: props.location ? props.location.name : '',
			address: props.location ? props.location.address : '',
			connectHWCapacity: props.location ? props.location.connectHWCapacity : '',
			url: props.location ? props.location.url : '',
			description: props.location ? props.location.description : ''
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
			props: { locationKey, editLocation },
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		editLocation(locationKey, values).then(() => {
			message.success('Location Edited');
			setSubmitting(false);
		});
	}
})(InnerForm);

export default LocationForm;
