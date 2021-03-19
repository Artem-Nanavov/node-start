module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.PG_HOST || 'localhost',
      user : process.env.PG_USER || 'postgres',
      password : process.env.PG_PWS || '1234',
      database : process.env.PG_DB || 'test',
    }
  },
  production: {
    client: 'pg',
    connection: process.env.PG_URL,
    pool: {
       min: 2,
       max: 10
    },
    migrations: {
      tablename: 'knex_migrations',
      directory: './migrations',
    }
  },
};
