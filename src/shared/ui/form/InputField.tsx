import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export const InputField: React.SFC<
	FieldProps<any> & { prefix: React.ReactNode; isTextArea?: boolean }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	isTextArea,
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];
	const Component = isTextArea ? Input.TextArea : Input;
	return (
		<FormItem 
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<Component {...field} {...props} />
		</FormItem>
	);
};
