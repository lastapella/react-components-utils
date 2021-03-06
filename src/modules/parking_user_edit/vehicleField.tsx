import * as React from 'react';
import {
	// Form as AntForm,
	Card,
	Col,
	Row,
	Icon,
	Button,
	Popconfirm
} from 'antd';
import {
	Field,
	/*  withFormik,*/ FormikProps,
	FieldArrayConfig,
	ArrayHelpers
} from 'formik';
import * as _ from 'lodash';
import { InputField } from './vehicleInputField';

const { Meta } = Card;

// @TODO
interface FormValues {
	[key: string]: any;
}

const DELETE_TEXT = 'Are you sure you want to delete this vehicle?';
const InnerForm = ({ index, errors, values, ...props }: any) => {
	return (
		<Card
			title={`Vehicle ${index + 1}`}
			style={{ marginBottom: '20px' }}
			actions={[
				<Popconfirm
					key="action-delete"
					placement="topLeft"
					title={DELETE_TEXT}
					// tslint:disable-next-line:jsx-no-lambda
					onConfirm={() => props.remove(index)}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary" size="large" icon="delete">
						Delete
					</Button>
				</Popconfirm>
			]}
		>
			{ values && values.drivers ? <Meta description={`This vehicle has ${values.drivers.length -1} other driver(s)`} /> : null}
			<Row gutter={16}>
				<Col xs={24} sm={24} md={12} lg={8}>
					<Field
						label="Brand"
						prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name={`vehicles.${index}.brand`}
						placeholder="Brand"
						component={InputField}
					/>
				</Col>
				<Col xs={24} sm={24} md={12} lg={8}>
					<Field
						label="Model"
						prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name={`vehicles.${index}.model`}
						placeholder="Model"
						component={InputField}
					/>
				</Col>
				<Col xs={24} sm={24} md={12} lg={8}>
					<Field
						label="Color"
						prefix={
							<Icon type="environment" style={{ color: 'rgba(0,0,0,.25)' }} />
						}
						name={`vehicles.${index}.color`}
						placeholder="Color"
						component={InputField}
					/>
				</Col>
				<Col xs={24} sm={24} md={12} lg={8}>
					<Field
						label="IU Number"
						prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
						required={true}
						name={`vehicles.${index}.iunumber`}
						placeholder="IU Number"
						component={InputField}
					/>
				</Col>
				<Col xs={24} sm={24} md={12} lg={8}>
					<Field
						label="Licence Plate"
						prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
						name={`vehicles.${index}.lpnumber`}
						placeholder="Licence Plate"
						component={InputField}
					/>
				</Col>
				{/* <Col span={8}>

				</Col> */}
			</Row>
		</Card>
	);
};

const DynamicVehicle = ({
	// push,
	// pop,
	// swap,
	// move,
	// insert,
	// replace,
	// unshift,
	// remove,
	// handlePush,
	// handlePop,
	// handleSwap,
	// handleMove,
	// handleInsert,
	// handleReplace,
	// handleUnshift,
	// handleRemove,
	form,
	...props
}: FormikProps<FormValues> &
	ArrayHelpers &
	FieldArrayConfig & { form: FormikProps<FormValues> }) => {
	return (
		<React.Fragment>
			{form.values.vehicles &&
				form.values.vehicles.map((vehicle: any, index: number) => {
					return (
						<InnerForm
							key={`vehicle-${index}`}
							values={vehicle}
							index={index}
							errors={form.errors.vehicles ? form.errors.vehicles[index] : null}
							{..._.pick(props, [
								'push',
								'pop',
								'swap',
								'move',
								'insert',
								'replace',
								'unshift',
								'remove'
							])}
						/>
					);
				})}
			<Row type="flex" justify="end">
				<Col>
					<Button
						type="primary"
						size="large"
						icon="plus-circle-o"
						// tslint:disable-next-line:jsx-no-lambda
						onClick={() => props.push({})}
					>
						Add Vehicle
					</Button>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default DynamicVehicle;
