/* eslint-disable radix */
const databaseConfig = {
	user: process.env.PG_USER || 'postgres',
	host: process.env.PG_HOST || 'localhost',
	database: process.env.PG_DB || 'test',
	password: process.env.PG_PWS || '1234',
	port: parseInt(process.env.PG_PORT || '5432'),
};

export default databaseConfig;
