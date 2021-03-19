import { Request } from 'express';
import { Session } from 'express-session';
import { IUser } from './user.d';

interface ISession extends Session {
	isAuth?: boolean;
	isGuest?: boolean;
	user?: IUser;
}

export interface IReq extends Request {
	session: ISession;
}
