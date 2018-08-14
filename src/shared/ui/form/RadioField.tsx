import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export const RadioGroupField: React.SFC<
	FieldProps<any> & {
		prefix: React.ReactNode;
		values: Array<{ value: string; label: string }>;
		type: 'normal' | 'button';
	}
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];
	const handleChange = (e: RadioChangeEvent) => {
		setFieldValue(field.name, e.target.checked);
	};
	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<RadioGroup {...field} {...props} onChange={handleChange}>
				{props.values.map(
					el =>
						props.type === 'button' ? (
							<RadioButton key={el.value} value={el.value}>
								{el.label}
							</RadioButton>
						) : (
							<Radio key={el.value} value={el.value}>
								{el.label}
							</Radio>
						)
				)}
			</RadioGroup>
		</FormItem>
	);
};
