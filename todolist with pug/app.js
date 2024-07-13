const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

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
