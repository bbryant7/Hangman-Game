const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
const data = [{  word: "Banana"}]
const blanks = [{blank: "_ _ _ _ _ _"}]
let guessedWords = [];
// VARIABLES ^^

// BOILER PLATE
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({
  extended: false}));
app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// BOILER PLATE

app.get('/', function(req, res) {
  res.render('hangman', {blanks})

})

app.post('/guess', function(req, res) {
req.checkBody('letter', 'please guess a letter').notEmpty();

let errors = req.validationErrors();
 if (errors) {
   console.log(errors)
   res.render("hangman", {errors});
 }
 else {
  let letter = req.body.letter;
  guessedWords.push(letter);
  res.render('hangman', {guessedWords});
}
})

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
