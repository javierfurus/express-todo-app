exports.up = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('status');
  });
};

exports.down = function (knex) {
  return knex.schema.table('todos', table => {
    table.dropColumn('status');
  });
};
