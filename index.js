const app_port = process.env.PORT || 3000
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const edge = require("edge.js");
const cloudinary = require('cloudinary');
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const conncetMongo = require("connect-mongo");
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require ('./controllers/createUser');
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');

const app = new express();
mongoose.connect(process.env.DB_URI);

app.use(connectFlash());

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_NAME
});

const mongoStore = conncetMongo(expressSession);

app.use(expressSession({
  secret: process.env.EXPRESS_SESSION_KEY,
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
}))

const { engine } = require('express-edge');
const { response } = require("express");



app.use(fileUpload({
    createParentPath: true
}));
app.use(express.static("public"));

app.use(engine);

app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
  edge.global('auth', req.session.userId);
  next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')
app.get('/', homePageController);

app.get("/post/:id", getPostController);

app.get('/posts/new', auth, createPostController);

app.get('/auth/logout', auth, logoutController)

app.post("/posts/store", auth, storePost, storePostController);

app.get('/auth/login', redirectIfAuthenticated, loginController);

app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.get('/auth/register', redirectIfAuthenticated, createUserController);

app.post('/users/register', redirectIfAuthenticated, storeUserController);

app.use((req, res) => res.render('not-found'));

app.listen(app_port, () => {
    console.log(`"App listen on port ${app_port}"`)
});