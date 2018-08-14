import * as yup from 'yup';
import {
	EMAIL_NOT_LONG_ENOUGH,
	INVALID_EMAIL,
	PASSWORD_NOT_LONG_ENOUGH,
	DISPLAYNAME_NOT_LONG_ENOUGH,
	INVALID_PHONE_NUMBER,
	INVALID_PICTURE_URL,
	REQUIRED_FIELD,
	LCD_MESSAGE_TOO_LONG
} from '../../../constants/validationMessages';

const gateNameValidation = yup
	.string()
	.min(3)
	.max(255)
	.required(REQUIRED_FIELD);

const portNumValidation = yup.number().required(REQUIRED_FIELD);

const gateMessageValidation = yup.string().max(20, LCD_MESSAGE_TOO_LONG);

export default yup.object().shape({
	name: gateNameValidation,
	portNum: portNumValidation,
	message: gateMessageValidation
});
