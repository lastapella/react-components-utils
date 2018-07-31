import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export const InputField: React.SFC<
	FieldProps<any> & { prefix: React.ReactNode }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, submitCount }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	// const errorMsg = touched[field.name] && errors[field.name];

	const fieldNameSplitted = field.name.split('.');
	const isTouched =
		touched.vehicles &&
		touched.vehicles[fieldNameSplitted[1]] &&
		touched.vehicles[fieldNameSplitted[1]][fieldNameSplitted[2]]
			? touched.vehicles[fieldNameSplitted[1]][fieldNameSplitted[2]]
			: null;
	const error =
		errors.vehicles &&
		errors.vehicles[fieldNameSplitted[1]] &&
		errors.vehicles[fieldNameSplitted[1]][fieldNameSplitted[2]]
			? errors.vehicles[fieldNameSplitted[1]][fieldNameSplitted[2]]
			: null;
	const errorMsg = (isTouched || submitCount !== 0) && error;
	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<Input {...field} {...props} />
		</FormItem>
	);
};
