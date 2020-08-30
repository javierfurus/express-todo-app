exports.up = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('completed');
    table.boolean('status').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('status');
  });
};
