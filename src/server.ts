import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import useragent from 'express-useragent';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import corsOptions from './middleware/cors';
import { logger, httpLogger } from './utils';
import checkServerEnvs from './utils/checkServerEnvs';
import sessionConfig from './configs/session.config';
import { IReq } from './interfaces/server_req.d';

require('dotenv').config();

const app: Express = express();
const server = http.createServer(app);
const port: number = 8000;

const runServer = () => {
	const stopServer = checkServerEnvs();

	if (stopServer) return;

	app.use(cookieParser());
	app.use(cors(corsOptions));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(session(sessionConfig));
	app.use(useragent.express());

	app.use((req: IReq, _, next) => {
		if (!req.session.isAuth) {
			req.session.isAuth = false;
			req.session.isGuest = true;
		}

		next();
	});

	app.use(httpLogger);

	app.use('/auth', authRouter);
	app.use('/user', userRouter);

	server.listen(port, () => {
		logger.info(`🚀  Server ready at http://localhost:${port}/`);
	});
};

runServer();
