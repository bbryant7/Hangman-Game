const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
// // const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(expressValidator());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', function(req, res){
  res.render('hangman')
})

app.post('/guess', function(req, res){
  let letter = req.body.letter;
  console.log(req.body.letter);
  res.render('hangman', {letter:req.body.letter})
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
