const express = require('express');
const session = require('express-session');

//controllers
const { showLoginPage, list, showAddPage, showEditPage, remove, create, update } = require('./controllers/culture');
const { login, logout } = require('./controllers/user');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: '23hnwif8990423423',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true }
 }));

app.set('view engine', 'ejs');
//show login page
app.get('/', showLoginPage);
//render add page
app.get('/add', showAddPage);
//show edit page from id
app.get('/edit/:detail_id', showEditPage);
//login
app.post('/login', login);
//logout
app.get('/logout', logout);
//show data
app.get('/detail', list);
//delete
app.get('/detail/delete/:detail_id', remove);
//add
app.post('/detail/add', create);
//edit
app.post('/detail/update/:detail_id', update);

app.listen(3000, () => console.log('Server is running on port 3000'));
