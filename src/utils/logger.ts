import { Response, Request, NextFunction } from 'express';
import winston, {
	createLogger,
	transports,
} from 'winston';

export const logger = createLogger({
	transports: [
		new transports.File({
			level: 'info',
			filename: './logs/info-file.log',
			format: winston.format.json(),
		}),
		new transports.File({
			level: 'error',
			filename: './logs/error-file.log',
			format: winston.format.json(),
		}),
		new transports.Console({
			level: 'debug',
			handleExceptions: true,
			format: winston.format.cli(),
		}),
		new transports.File({
			level: 'http',
			filename: './logs/http-file.log',
			format: winston.format.json(),
		}),
	],
});

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
	if (req.url.startsWith('/graphql')) {
		logger.http('REQUEST', req.body);
	}

	next();
};
