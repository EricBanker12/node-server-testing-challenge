
exports.up = function(knex) {
  return knex.schema
    .createTable('users', tbl => {
        // id: primary key
        tbl.increments()
        // username: string unique required
        tbl.string('username').unique().notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('users')
};
