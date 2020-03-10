const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));

let posts = [];

app.get('/', function(req,res){
    res.render('home', {
        posts: posts
    });
});

app.get('/compose', function(req, res){
    res.render('compose');
});

app.post('/compose', function(req,res){
    const post = {
        title: req.body.title,
        essay:req.body.essay
    };
    posts.unshift(post);
    res.redirect('/');
});

app.get('/posts/:postName', function(req,res){
    const reqeustedTitle = req.params.postName.toLowerCase();
    posts.forEach(function(mine){
        const storedTitle = mine.title.toLowerCase();
        if(storedTitle === reqeustedTitle){
            res.render('post', {
                title: mine.title,
                essay: mine.essay
            })
        } else {
            res.send('<h1>404 Not Found</h1>')
        }
    });
});


app.listen(3000, function(){
    console.log('Server started on port 3000');
});