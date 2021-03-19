import Ajv from 'ajv';
import {Response, NextFunction} from 'express';
// @ts-ignore
import apply from 'ajv-formats-draft2019';
import getSchemas from '../utils/getSchemas';
// @ts-ignore
import { IReq } from '../interfaces/server_req.d';

const validateBodyValues = (
	req: IReq,
	res: Response,
	next: NextFunction,
) => {
	if (req.useragent && req.useragent.browser !== 'unknown' && req.route.path === '/logout') {
		return next();
	}

	const schema = getSchemas(req.route.path);

	if (!schema) {
		return res.status(500).json({message: 'Server error'});
	}

	const ajv = new Ajv();
	apply(ajv);
	const data = req.body;
	const validate = ajv.compile(schema);

	const validatedData = validate(data);

	if (validatedData) {
		return next();
	}

	const error = validate.errors;

	return res.status(415).json({error});
};

export default validateBodyValues;
