import * as React from 'react';
import {
	withFormik,
	FormikProps,
	Form,
	Field /* , FieldProps */
} from 'formik';
import { Form as AntForm, Icon, Button, Row, Col, message, Modal } from 'antd';
// import adminValidationSchema from './validationSchema';
import { InputField } from '../../../shared/ui/form';
import { PresenterProps } from './addFormContainer';
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
	modalVisible,
	resetForm,
	handleCloseModal
}: FormikProps<FormValues> & PresenterProps) => {
	return (
		<Modal
			visible={modalVisible}
			title="Create a new location"
			okText="Create"
			// tslint:disable-next-line:jsx-no-lambda
			onCancel={() => {
				handleCloseModal();
				resetForm();
			}}
			onOk={handleSubmit}
			confirmLoading={isSubmitting}
		>
			<Form
				className="location-add-form ant-form ant-form-horizontal"
				noValidate={true}
			>
				<Field
					label="name"
					required={true}
					prefix={
						<Icon type="info-circle-o" style={{ color: 'rgba(0,0,0,.25)' }} />
					}
					name="name"
					placeholder="Name"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
				<Field
					label="Capacity of connected Hardware devices"
					required={true}
					min={0}
					name="connectHWCapacity"
					placeholder="Capacity of connected Hardware devices"
					component={InputNumberField}
				/>
				<Field
					label="IP Address"
					required={true}
					prefix={<Icon type="global" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="ipaddress"
					placeholder="IP Address"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
				<Field
					label="Address"
					isTextArea={true}
					row={4}
					name="address"
					placeholder="Address"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
				<Field
					label="Description"
					isTextArea={true}
					row={4}
					name="description"
					placeholder="Description"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
			</Form>
		</Modal>
	);
};

const LocationForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			name: '',
			address: '',
			connectHWCapacity: '',
			ipaddress: '',
			description: ''
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
			props: { addLocation, handleCloseModal },
			resetForm,
			setSubmitting,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		addLocation(values).then(() => {
			message.success('Location Added');
			setSubmitting(false);
			handleCloseModal();
			resetForm();
		});
	}
})(InnerForm);

export default LocationForm;
