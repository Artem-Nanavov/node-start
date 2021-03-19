
exports.up = (knex) => {
  return knex.schema
    .createTable('session', t => {
      t.string('sid', 255).notNullable().primary();
      t.json('sess').notNullable();
      t.timestamp('expire').notNullable();
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('session')
};
