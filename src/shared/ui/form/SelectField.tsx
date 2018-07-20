import * as React from 'react';
import { FieldProps } from 'formik';
import { Form, Select } from 'antd';
import { SelectValue } from 'antd/lib/select';

const FormItem = Form.Item;
const Option = Select.Option;

export const SelectField: React.SFC<
	FieldProps<any> & { prefix: React.ReactNode }
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];

	const handleChange = (value: SelectValue) => {
		setFieldValue(field.name, value);
	};
	const handleBlur = () => {
		setFieldTouched(field.name);
	};

	return (
		<FormItem
			{...props}
			help={errorMsg}
			validateStatus={errorMsg ? 'error' : undefined}
		>
			<Select {...field} {...props} onChange={handleChange} onBlur={handleBlur}>
				{React.Children.map(
					props.children,
					(
						child: React.ReactElement<any> & {
							type: { isSelectOption: boolean };
						}
					) =>
						child.type === 'option' || child.type.isSelectOption ? (
							<Option {...child.props} />
						) : (
							''
						)
				)}
			</Select>
		</FormItem>
	);
};
