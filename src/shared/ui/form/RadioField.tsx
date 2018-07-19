import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Radio } from 'antd';

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
	form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];

	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<RadioGroup {...field} {...props}>
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
