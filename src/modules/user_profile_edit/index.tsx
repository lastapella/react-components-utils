// - form handled by formik
// - style antdesign
// - submission to firebase database (rtd)

import * as React from 'react';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { Form as AntForm, Icon, Button } from 'antd';

import {
	InputField,
	CheckBoxField,
	SelectField,
	RadioGroupField,
	SwitchField,
	DatePickerField
} from '../../shared/ui/form';

const FormItem = AntForm.Item;

interface FormValues {
	firstname: string;
	lastname: string;
	above18: boolean;
}

// interface Props {
//   submit: (
//     values: FormValues
//   ) => Promise<{
//     [key: string]: string;
//   } | null>;
// }

const genderValues = [
	{ value: 'M', label: 'Male' },
	{
		value: 'F',
		label: 'Female'
	},
	{
		value: 'O',
		label: 'Other'
	}
];

const InnerForm = ({
	values,
	errors,
	touched,
	handleChange,
	handleBlur,
	setFieldValue,
	setFieldTouched,
	handleSubmit,
	isSubmitting
}: FormikProps<FormValues>) => (
	<Form className="login-form">
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
		<FormItem>
			<Field
				name="above18"
				fieldLabel="Plese confirm that you are above 18"
				label="I'm above 18"
				component={CheckBoxField}
			/>
		</FormItem>
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
			<Field
				label="Select your gender"
				name="gender"
				component={RadioGroupField}
				type="button"
				values={genderValues}
			/>
		</FormItem>

		<FormItem>
			<Field
				name="dateBirth"
				component={DatePickerField}
				type="range"
				label="Enter your date of birth"
			/>
		</FormItem>
    <FormItem>
			<Field
        name="disableThis"
        required={true}
				component={SwitchField}
				label="Disable this features?"
			/>
		</FormItem>
		<FormItem>
			<a className="login-form-forgot" href="">
				Forgot password
			</a>
			<Button type="primary" htmlType="submit" className="login-form-button">
				Log in
			</Button>
			Or <a href="">register now!</a>
		</FormItem>
	</Form>
);

const MyForm = withFormik<any, FormValues>({
	// Transform outer props into form values
	mapPropsToValues: props => ({
		firstname: '',
		lastname: '',
		above18: true,
		carBrand: '',
		gender: ''
	}),
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
	}
})(InnerForm);

export default MyForm;
