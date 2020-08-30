exports.seed = function (knex) {
  return knex('todos').del()
    .then(function () {
      const todos = [
        {
          title: 'Get up at 6.30 AM',
          priority: 1
        },
        {
          title: 'Go shopping',
          priority: 3
        },
        {
          title: 'Walk the dog',
          priority: 1
        },
        {
          title: 'Cook dinner',
          priority: 2,
          due_date: addDays(new Date(), 3),
          status: 0
        }
      ];

      return knex('todos').insert(todos);
    });
};

function addDays (date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}
