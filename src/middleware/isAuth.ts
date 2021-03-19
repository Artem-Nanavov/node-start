import { Response, NextFunction } from 'express';
import { IReq } from '../interfaces/server_req.d';

const isAuth = async (req: IReq, res: Response, next: NextFunction) => {
	if (req.session.isAuth && !req.session.isGuest) {
		return next();
	}

	req.session.isGuest = true;
	req.session.isAuth = false;

	return res.status(403).json({message: 'Not authorized'});
};

export default isAuth;
