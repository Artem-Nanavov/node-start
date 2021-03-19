
exports.up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema
    .createTable('refresh_tokens', t => {
      t.string('user_id').notNullable();
      t.string('refresh_token').notNullable();
      t.uuid('_id').unique().notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('refresh_tokens')
};
