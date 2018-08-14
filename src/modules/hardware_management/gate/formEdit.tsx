import * as React from 'react';
import {
	withFormik,
	FormikProps,
	Form,
	Field /* , FieldProps */
} from 'formik';
import { Form as AntForm, Icon, Button, Row, Col, message } from 'antd';
// import adminValidationSchema from './validationSchema';
import { InputField, SelectField } from '../../../shared/ui/form';
import { PresenterProps } from './formEditContainer';
import { InputNumberField } from '../../../shared/ui/form/InputNumberField';
import HelperText from '../../../shared/ui/form/HelperText';
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
								label="Name"
								required={true}
								name="name"
								placeholder="Name"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="Port number"
								required={true}
								min={0}
								name="portNum"
								placeholder="Port number"
								component={InputNumberField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field
								label="LCD Message"
								name="message"
								placeholder="LCD message"
								component={InputField}
							/>
						</Col>
						<Col xs={24} sm={24} md={12} lg={6}>
							<Field name="type" label="Type" component={SelectField}>
								<option value="barrier">Barrier</option>
								<option value="roadhump">Road hump</option>
								<option value="other">Other</option>
							</Field>
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
			portNum: props.gate ? props.gate.portNum : '',
			message: props.gate ? props.gate.message : '',
			type: props.gate ? props.gate.type : ''
		};
	},
	validationSchema: gateValidationSchema,
	// Add a custom validation function (this can be async too!)
	// validate: (values, {location}) => {
	// 	const errors: any = {};
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
