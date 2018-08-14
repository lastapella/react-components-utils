import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, InputNumber } from 'antd';

const FormItem = Form.Item;

export const InputNumberField: React.SFC<FieldProps<any>> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];
	const handleChange = (value: number | string | undefined) => {
		setFieldValue(field.name, value);
	};
	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<InputNumber
				{...field}
				{...props}
				onChange={handleChange}
				style={{ width: '100%', textAlign: 'right' }}
			/>
		</FormItem>
	);
};
