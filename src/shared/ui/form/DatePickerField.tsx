import { Form, DatePicker } from 'antd';
import * as React from 'react';
import { FieldProps } from 'formik';
import { Moment } from 'moment';

const FormItem = Form.Item;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const switchRender = (type: string, props: any) => {
	console.log(props);
	switch (type) {
		case 'normal':
			return <DatePicker {...props} />;
		case 'month':
			return <MonthPicker {...props} />;
		case 'week':
			return <WeekPicker {...props} />;
		case 'range':
			return <RangePicker {...props} />;
		default:
			return <DatePicker {...props} />;
	}
};

export const DatePickerField: React.SFC<
	FieldProps<any> & {
		prefix: React.ReactNode;
		type: 'normal' | 'month' | 'range' | 'week';
	}
> = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, setFieldValue, setFieldTouched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => {
	const errorMsg = touched[field.name] && errors[field.name];

	const handleChange = (value: Moment) => {
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
			{switchRender(props.type, {
				...field,
				...props,
				onChange: handleChange,
				onBlur: handleBlur
			})}
		</FormItem>
	);
};
