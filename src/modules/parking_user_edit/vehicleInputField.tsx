import * as React from 'react';
import { FieldProps, getIn } from 'formik';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

export const InputField: React.SFC<
	FieldProps<any> & { prefix: React.ReactNode }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, submitCount }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {

	const error = getIn(errors, field.name);
	const isTouched = getIn(touched, field.name);

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
