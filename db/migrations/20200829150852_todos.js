exports.up = function (knex) {
  return knex.schema.createTable('todos', table => {
    table.increments();
    table.string('title').notNullable();
    table.integer('priority').notNullable().defaultTo(1);
    table.timestamp('due_date');
    table.timestamps(true, true);
    table.boolean('completed').defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
