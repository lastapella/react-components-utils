import * as React from 'react';
import {
	withFormik,
	FormikProps,
	Form,
	Field /* , FieldProps */
} from 'formik';
import { Form as AntForm, Icon, Button, Row, Col, message, Modal } from 'antd';
// import adminValidationSchema from './validationSchema';
import { InputField, SelectField } from '../../../shared/ui/form';
import { PresenterProps } from './formAddContainer';
import { InputNumberField } from '../../../shared/ui/form/InputNumberField';
import gateValidationSchema from './validationSchema';
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
					label="Name"
					required={true}
					name="name"
					placeholder="Name"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
				<Field
					label="Port number"
					required={true}
					min={0}
					name="portNum"
					placeholder="Port number"
					component={InputNumberField}
				/>
				<Field
					label="LCD Message"
					name="message"
					placeholder="LCD message"
					onPressEnter={handleSubmit}
					component={InputField}
				/>
				<Field name="Type" label="type" component={SelectField}>
					<option value="barrier">Barrier</option>
					<option value="roadhump">Road hump</option>
					<option value="other">Other</option>
				</Field>
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
			portNum: '',
			message: '',
			type: ''
		};
	},
	validationSchema: gateValidationSchema,
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
