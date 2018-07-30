import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Switch } from 'antd';

const FormItem = Form.Item;

export const SwitchField: React.SFC<
	FieldProps<any> & { label: string }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors , setFieldValue}, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];
  const handleChange = (checked: boolean) => {
    setFieldValue(field.name, checked)
	}
	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<Switch  {...props} onChange={handleChange} checked={field.value}/>
		</FormItem>
	);
};
