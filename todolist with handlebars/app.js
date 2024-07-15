const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

Handlebars.registerHelper('and', function(a, b) {
  return a && b;
});

Handlebars.registerHelper('equal', function(a, b) {
    return a === b;
  });

Handlebars.registerHelper('or', function(a, b) {
  return a || b;
});


const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

let tasks = [];

app.get('/', (req, res) => {
    res.render('index', { title: 'To-Do List', tasks: tasks });
});

app.post('/add', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const taskIndex = req.body.index;
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
    }
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
