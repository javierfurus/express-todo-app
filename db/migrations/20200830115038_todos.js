exports.up = function (knex) {
  return knex.schema.dropTable('todos');
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
