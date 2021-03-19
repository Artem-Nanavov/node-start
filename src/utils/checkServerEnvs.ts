import { logger } from './logger';

interface IEnvs {[key: string]: string | undefined}

const checkServerEnvs = () => {
	const allowsToUndefiend = ['PORT', 'REFRESH_MIN_LENGTH'];
	let error = false;
	const undefinedEnvs: string[] = [];

	const envs: IEnvs = {
		PORT: process.env.PORT,

		/** pg envs */
		PG_USER: process.env.PG_USER,
		PG_HOST: process.env.PG_HOST,
		PG_DB: process.env.PG_DB,
		PG_PWS: process.env.PG_PWS,
		PG_PORT: process.env.PG_PORT,

		/** token envs */
		ACCESS_KEY: process.env.ACCESS_KEY,
		REFRESH_MIN_LENGTH: process.env.REFRESH_MIN_LENGTH,

		/** session envs */
		SESS_SECRET: process.env.SESS_SECRET,
	};

	Object.keys(envs).forEach((env_key: string) => {
		if (!envs[env_key] && !allowsToUndefiend.includes(env_key)) {
			error = true;
			undefinedEnvs.push(env_key);
		}
	});

	if (error) {
		logger.info(`You don't have envs variable, please set all envs variables - ${undefinedEnvs}`);

		return true;
	}

	return false;
};

export default checkServerEnvs;
