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
import { PresenterProps } from './formAddContainer';
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
			title="Create a new gate"
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
				className="gate-add-form ant-form ant-form-horizontal"
				noValidate={true}
			>
				<Field
					label="name"
					required={true}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="name"
					placeholder="Name"
					component={InputField}
				/>
				<Field
					label="Location"
					required={true}
					prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="location"
					placeholder="Location"
					component={InputField}
				/>
				<Field
					label="IP Address"
					required={true}
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="ipaddress"
					placeholder="IP Address"
					component={InputField}
				/>
				<Field
					label="Description"
					isTextArea={true}
					row={4}
					required={true}
					prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
					name="description"
					placeholder="Description"
					component={InputField}
				/>
			</Form>
		</Modal>
	);
};

const GateForm = withFormik<PresenterProps, FormValues>({
	enableReinitialize: true,
	// validateOnChange: false,
	// Transform outer props into form values
	mapPropsToValues: props => {
		return {
			name: '',
			location: '',
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
			props: { addGate, handleCloseModal, locationKey },
			setSubmitting,
			resetForm,
			setErrors /* setValues, setStatus, and other goodies */
		}
	) => {
		addGate(locationKey, values).then(() => {
			message.success('Gate Added');
			setSubmitting(false);
			handleCloseModal();
			resetForm();
		});
	}
})(InnerForm);

export default GateForm;
