import * as yup from 'yup';
import {
	EMAIL_NOT_LONG_ENOUGH,
	INVALID_EMAIL,
	REQUIRED_FIELD,
	INVALID_IU
} from '../../constants/validationMessages';

const driverNameValidation = yup.string().required(REQUIRED_FIELD);
const driverEmailValidation = yup
	.string()
	.min(5, EMAIL_NOT_LONG_ENOUGH)
	.max(255)
	.email(INVALID_EMAIL)
	.required(REQUIRED_FIELD);

const vehicleValidationSchema = yup.object().shape({
	brand: yup.string().max(255).nullable(true),
	model: yup.string().max(255).nullable(true),
	color: yup.string().max(255).nullable(true),
	iunumber: yup
		.string()
		.matches(/^\d{10}$/, INVALID_IU)
		.required(REQUIRED_FIELD),
	lpnumber: yup.string().nullable(true)
});

export default yup.object().shape({
	firstname: driverNameValidation,
	lastname: driverNameValidation,
	email: driverEmailValidation,
	vehicles: yup.array().of(vehicleValidationSchema)
});
