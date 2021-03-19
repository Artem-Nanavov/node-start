import argon2 from 'argon2';
import { IUser } from '../interfaces/user.d';
import { logger } from '../utils/index';
import generateSalt from '../utils/generateSalt';
import pool from '../database/database';

class User {
	public getMeInfo = async (_id: string) => {
		try {
			const user = await pool.query('SELECT * FROM users WHERE _id = $1', [
				_id,
			]);

			if (user.rows.length === 0) {
				return {
					isError: true,
					status: 401,
					message: 'User not found',
				};
			}

			return {
				isError: false,
				status: 200,
				user: {
					_id,
					email: user.rows[0].email,
					username: user.rows[0].username,
				},
			};
		} catch (e) {
			logger.error('getMeInfo error', e.message);

			return {
				isError: true,
				status: 500,
				message: 'Server error',
			};
		}
	};

	public getUser = async (id: string) => {
		try {
			const user = await pool.query('SELECT * FROM users WHERE _id = $1', [
				id,
			]);

			if (user.rows.length === 0) {
				return {
					isError: true,
					status: 401,
					message: 'User not found',
				};
			}

			delete user.rows[0].password;
			return {
				status: 200,
				isError: false,
				user: user.rows[0],
			};
		} catch (e) {
			logger.error('getUser error', e);

			return {
				isError: true,
				status: 500,
				message: 'Server error',
			};
		}
	};

	public loginUser = async ({
		password,
		email,
	}: IUser) => {
		try {
			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);

			if (user.rows.length === 0) {
				return {
					isError: true,
					status: 401,
					message: 'User not found',
				};
			}

			if (!await argon2.verify(user.rows[0].password, password)) {
				return {
					isError: true,
					status: 401,
					message: 'Values are incorrect',
				};
			}

			return {
				isError: false,
				status: 200,
				user: user.rows[0],
			};
		} catch (e) {
			logger.error('loginUser error', e);

			return {
				isError: true,
				status: 500,
				message: 'Server error',
			};
		}
	};

	public createUser = async ({
		username,
		password,
		email,
	}: IUser) => {
		try {
			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);

			if (user.rows.length > 0) {
				return {
					isError: true,
					status: 401,
					message: 'User already exist',
				};
			}

			const hashedPassword = await argon2.hash(password);

			const newUser = await pool.query(
				'INSERT INTO users (username, email, password, salt) VALUES ($1, $2, $3, $4) RETURNING *',
				[
					username,
					email,
					hashedPassword,
					generateSalt(70),
				],
			);

			return {
				isError: false,
				status: 200,
				user: newUser.rows[0],
			};
		} catch (e) {
			logger.error('createUser error', e);

			return {
				isError: true,
				status: 500,
				message: 'Server error',
			};
		}
	};
}

const user = new User();

export default user;
