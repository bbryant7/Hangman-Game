const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const app = express();
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");

const data = [{  word: "Banana"}]
let word = "candy";
let display = [];
let guess = [];
let limit = 8;

// VARIABLES ^^

// BOILER PLATE
// mustache
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
// body-parser
app.use(bodyParser.urlencoded({
  extended: false}));
// validator
app.use(expressValidator());
// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
// BOILER PLATE
//
// app.use(function (req, res, next) {
//   console.log('in interceptor');
//   if (req.session.letter != letter) {
//     guessedWords.push(letter);
//     next()
//   } else (req.session === letter) {
//     // fall out of loop ?
//     // maybe add error that says (you already guessed that)
//     console.log ("meow");
//   }
// })

app.get('/', function(req, res) {
  for (let i = 0; i < word.length; i++) {
    display.push('_ ');
  }
  console.log(display)
  console.log(word)
  res.render('hangman', {display})


})

app.post('/guess', function(req, res) {

// checks for error of empty guess
req.checkBody('letter', 'please guess a letter').notEmpty();
let errors = req.validationErrors();
let letter = req.body.letter;
 if (errors) {
  //  console.log(errors)
   res.render("hangman", {errors});
   console.log ("error");
 }
 else {
   console.log("no error");
  res.render('hangman', {guess});
}

// use a for each loop to itterate over word and push letters to display
 // word = word.split("")


for (let i = 0; i < word.length; i++) {
 if (letter === word[i]){
   let push = word.indexOf(letter)
   display.splice(push, 1, letter);
     res.render('hangman', {display});
    console.log("the word is",word);
     console.log(display);

   }
 };


 // word.forEach(function(e){
 //   console.log(e, "it worked");
 //   if (letter === e){
 //     let push = word.indexOf(letter)
 //     display.splice(push, 1, letter);
 //      //  res.render('hangman', {guess});
 //      console.log('display', display);
 //      console.log ("is this working?");
 //     }
 //  })
})


app.listen(3000, function() {
  console.log('Successfully started express application!');
})
