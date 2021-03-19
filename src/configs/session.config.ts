const session = require('express-session');
require('dotenv').config();
const pgSession = require('connect-pg-simple');

const PGSess = pgSession(session);

const [user, host, db, pws, port] = [
	process.env.PG_USER,
	process.env.PG_HOST,
	process.env.PG_DB,
	process.env.PG_PWS,
	process.env.PG_PORT,
];

const sessStore = new PGSess({
	conString: `pg://${user}:${pws}@${host}:${port}/${db}`,
	tableName: 'session',
});

const sessionConfig = {
	store: sessStore,
	name: 'SID',
	secret: process.env.SESS_SECRET || 'secret_key',
	resave: true,
	saveUninitialized: true,
	cookie: {
		secure: false,
		httpOnly: true,
		maxAge: 30 * 24 * 60 * 60 * 1000,
	},
};

export default sessionConfig;
