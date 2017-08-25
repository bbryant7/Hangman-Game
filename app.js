const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const wordList = require('./models/words');
const app = express();
// const words = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");
let word = wordList[Math.floor(Math.random() * wordList.length)];
// let word = "candy";
word = word.split("");
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
  extended: false
}));
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

app.get('/', function(req, res) {
  for (let i = 0; i < word.length; i++) {
    display.push('_ ');
  }
  console.log(display)
  console.log(word)
  res.render('hangman', {
    display,
    limit,
    guess})
})


// app.use(function (req, res, next) {
//   console.log('in interceptor');
//   guess.forEach(function(e) {
//   if (req.session.letter != e) {
//     guess.push(letter);
//     next()
//   } else {
//     next()
//     console.log ("meow");
//   }
// })
// })


// [] CHECKPOINT 1 - IS LETTER UNIQUE
//  keep track of guessed letters with session: make sure it has not already been guessed
//   create for loop
//   iterate over array of guessed letters
//   if (guessed letter != array.letter[i]) { push to array of guessed letter}
//   else {error: "you all ready guessed that",}

app.post('/guess', function(req, res) {
  // checks for error of empty guess
  req.checkBody('letter', 'please guess a letter').notEmpty();
  let errors = req.validationErrors();
  let letter = req.body.letter;
  if (errors) {
    //  console.log(errors)
    res.render("hangman", {
      errors,
      display,
      limit,
      guess});
    console.log("error");
  } else {

    console.log("no error");
    word.forEach(function(e) {
      console.log(e, "it worked");
      if (letter === e) {
        let push = word.indexOf(letter)
        display.splice(push, 1, letter);
        //  res.render('hangman', {guess});
        console.log('display', display);
        console.log("is this working?");
        console.log("word", word);
      }
    })
    guess.push(letter);
    // need to split the guess array
    res.render('hangman', {
      display,
      limit,
      guess});
  }
});

// use a for each loop to itterate over word and push letters to display
// word = word.split("")

//
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


// for (let i = 0; i < word.length; i++) {
//   if (letter === word[i]) {
//     let push = word.indexOf(letter)
//     display.splice(push, 1, letter);
//     console.log("the word is", word);
//     console.log(display);
//
//   }
// }


app.listen(3000, function() {
  console.log('Successfully started express application!');
})
