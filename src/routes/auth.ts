import { Router, Response } from 'express';
import { logger } from '../utils/index';
import { IReq } from '../interfaces/server_req';
import validateBodyValues from '../middleware/checkReqValues';
import _user from '../models/user';

const router = Router();

router.post('/reg', validateBodyValues, async (req: IReq, res: Response) => {
	try {
		const newUser = await _user.createUser(req.body);

		if (newUser.status !== 200) {
			return res.status(newUser.status).json({message: newUser.message});
		}

		req.session.isAuth = true;
		req.session.isGuest = false;
		req.session.user = newUser.user;

		return res.status(200);
	} catch (e) {
		logger.error('auth login error', e);

		return res.status(500).send('Server Error');
	}
});

router.post('/login', validateBodyValues, async (req: IReq, res: Response) => {
	try {
		const user = await _user.loginUser(req.body);

		if (user.status !== 200) {
			return res.status(user.status).json({message: user.message});
		}

		req.session.isAuth = true;
		req.session.isGuest = false;
		req.session.user = user.user;

		return res.status(200);
	} catch (e) {
		logger.error('auth login error', e);

		return res.status(500).send('Server Error');
	}
});

export default router;
