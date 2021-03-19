import {
	createUserSchema,
	loginUserSchema,
	refreshTokensSchema,
} from '../ajvSchemas/user';

export const getSchemas = (path: string) => {
	switch (path) {
	case '/login':
		return loginUserSchema;
	case '/reg':
		return createUserSchema;
	case '/logout':
	case '/refresh-tokens':
		return refreshTokensSchema;
	default:
		return null;
	}
};

export default getSchemas;
