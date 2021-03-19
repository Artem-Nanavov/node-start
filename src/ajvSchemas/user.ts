import {JSONSchemaType} from 'ajv';
import { ICreateUser, ILogin } from '../interfaces/user';

export const createUserSchema: JSONSchemaType<ICreateUser> = {
	type: 'object',
	properties: {
		username: {type: 'string', minLength: 1},
		password: {type: 'string', minLength: 6},
		email: {type: 'string', format: 'idn-email'},
	},
	required: ['email', 'password', 'username'],
	additionalProperties: false,
};

export const loginUserSchema: JSONSchemaType<ILogin> = {
	type: 'object',
	properties: {
		password: {type: 'string', minLength: 6},
		email: {type: 'string', format: 'idn-email'},
	},
	required: ['email', 'password'],
	additionalProperties: false,
};
