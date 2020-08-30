const express = require('express');
const knex = require('../db/knex');
const { response } = require('../app');
const { handlebars } = require('hbs');
const router = express.Router();
const moment = require('moment-timezone');
handlebars.registerHelper('formatDate', function (dateString) {
  return new handlebars.SafeString(
    moment(dateString).format('YYYY-MM-D')
  );
});
router.get('/', async (req, res, next) => {
  const todos = await knex('todos').select();
  res.render('todos', { title: 'All todos', todos });
});
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'Add new' });
});
router.get('/edit/:id', async (req, res, next) => {
  const id = req.params.id;
  const todo = await knex('todos').select()
    .where('id', id);
  res.render('edit', { title: `Edit todo ${id}`, todo });
});
router.use((req, res, next) => {
  // Itt megnézzük, hogy a hívás, amit kapunk, az mi
  if (req.query._method === 'DELETE') {
    // Ezzel megváltoztatjuk az eredeti metódust DELETE-re
    req.method = 'DELETE';
    // Majd visszalakítjuk az eredeti URL-t, pl. /todos/1
    req.url = req.path;
  }
  if (req.query._method === 'PUT') {
    // Putnál ismét megcsináljuk ugyanezt
    req.method = 'PUT';
    req.url = req.path;
  }
  next();
});

router.post('/', async (req, res, next) => {
  if (isTodoValid(req.body)) {
    const todo = {
      title: req.body.title,
      priority: req.body.priority,
      due_date: req.body.due_date
    };
    await knex('todos').insert(todo);
    res.redirect('/todos');
  } else {
    res.status(400);
    res.render('error', { message: 'Invalid input' });
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  if (id) {
    await knex('todos')
      .where('id', id)
      .del();
    res.redirect('/todos');
  } else {
    res.render('error', { message: 'ID cannot be empty!' });
  }
});
router.put('/:id/update', async (req, res, next) => {
  const id = req.params.id;
  const updateTodo = {
    title: req.body.title,
    priority: req.body.priority,
    due_date: req.body.due_date
  };
  if (id) {
    await knex('todos')
      .where('id', id)
      .update(updateTodo);
    res.redirect('/todos');
  } else {
    res.render('error', { message: 'ID cannot be empty!' });
  }
});
router.put('/:id/done', async (req, res, next) => {
  const id = req.params.id;
  const statusSQL = await knex('todos').select('status')
    .where('id', id);
  const status = (Object.assign({}, statusSQL[0])).status;

  if (id) {
    await knex('todos')
      .where('id', id)
      .update('status', !status);
    res.redirect('/todos');
  }
});
const isTodoValid = (todo) => {
  return todo.title && todo.priority && todo.due_date;
};
module.exports = router;
