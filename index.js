const path = require("path");
const express = require("express");

const app = new express();

const { engine } = require('express-edge');




app.use(express.static("public"));

app.use(engine);

app.set('views', `${__dirname}/views`);


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
});

app.listen(4000, () => {
    console.log("App listen on port 4000")
});