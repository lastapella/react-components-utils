import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Checkbox } from 'antd';

const FormItem = Form.Item;

export const CheckBoxField: React.SFC<
	FieldProps<any> & { label: string; fieldLabel?: string }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];

	return (
		<FormItem
			{...props}
			label={props.fieldLabel}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<Checkbox {...field} {...props} checked={field.value}>
				{' '}
				{props.label}
			</Checkbox>
		</FormItem>
	);
};
