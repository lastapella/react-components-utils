import * as yup from 'yup';
import {
	EMAIL_NOT_LONG_ENOUGH,
	INVALID_EMAIL,
	PASSWORD_NOT_LONG_ENOUGH,
	DISPLAYNAME_NOT_LONG_ENOUGH,
	INVALID_PHONE_NUMBER,
	INVALID_PICTURE_URL,REQUIRED_FIELD
} from '../../../constants/validationMessages';

const adminDisplayNameValidation = yup
	.string()
	.min(3, DISPLAYNAME_NOT_LONG_ENOUGH)
	.max(255)
	.required(REQUIRED_FIELD);

const adminPasswordValidation = yup
	.string()
	.min(6, PASSWORD_NOT_LONG_ENOUGH)
	.max(255)

const adminEmailValidation = yup
	.string()
	.min(5, EMAIL_NOT_LONG_ENOUGH)
	.max(255)
	.email(INVALID_EMAIL)
	.required(REQUIRED_FIELD);

// E.164 phone format (kinda => depends of the country)
const adminPhoneValidation = yup
	.string()
	.matches(/^(\+[1-9]\d{0,2})?\d{4,14}$/, INVALID_PHONE_NUMBER)
	.nullable(true);

const adminPictureURLValidation = yup
	.string()
	.url(INVALID_PICTURE_URL)
	.nullable(true);

export default yup.object().shape({
	displayName: adminDisplayNameValidation,
	email: adminEmailValidation,
	password: adminPasswordValidation,
	phoneNumber: adminPhoneValidation,
	photoURL: adminPictureURLValidation
});
