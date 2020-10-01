const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')


Post.find({}, (error, posts) => {
    console.log(error, posts);

})

Post.create({
  title: 'My second blog post',
  description: 'second Blog post description',
  content: 'Lorem ipsum content.'
}, (error, post) => {
  console.log(error, post)
})