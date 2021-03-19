import { Router } from 'express';
import { IReq } from '../interfaces/server_req.d';
import validateBodyValues from '../middleware/checkReqValues';
import isAuth from '../middleware/isAuth';
import { logger } from '../utils/index';
import _user from '../models/user';

const router = Router();

router.get('/me', isAuth, async (req: IReq, res) => {
	try {
		const token = req.session.user && req.session.user._id;

		if (!token) {
			return res.status(401).json({message: 'Unauthorized'});
		}

		const user = await _user.getMeInfo(token);

		if (user.status === 200) {
			return res.status(200).json({user: user.user});
		}

		return res.status(user.status).json({message: user.message});
	} catch (e) {
		logger.error('Server Error', e.message);

		return res.status(500).send('Server Error');
	}
});

router.post('/logout', validateBodyValues, async (req: IReq, res) => {
	try {
		req.session.isAuth = false;

		return res.status(200).end();
	} catch (e) {
		logger.error('Server Error', e.message);

		return res.status(500).send('Server Error');
	}
});

router.get('/isAuth', isAuth, async (_, res) => res.status(200).end());

export default router;
