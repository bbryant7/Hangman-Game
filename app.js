const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const wordList = require('./models/words');
const hangman = {};
const app = express();
let word = wordList[Math.floor(Math.random() * wordList.length)];
word = word.split("");
let wrong = false;


newGame = function() {
  display = [];
  limit = 8;
  win = false;
  guess = [];
  for (let i = 0; i < word.length; i++) {
    display.push('_ ');
  }
}
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

app.get('/', function(req, res) {
  if (!req.session.hangman) {
    req.session.hangman = hangman;
    newGame();
    console.log(display)
    console.log(word)
    res.render('hangman', {
      display
    });
  } else {
    res.render('hangman', {
      display
    });
  }
});

app.get('/win', function(req, res) {
  res.render('win')
})

app.get('/again', function(req, res) {
  res.render('tryagain', {word})
})

//  check 1: is it a letter?
//  check 2: is it a dublicate guess?
//  check 3: is it a correct guesss?

app.post('/guess', function(req, res) {
  // check 1 - letter
  req.checkBody('letter', 'please guess a letter').notEmpty();
  req.checkBody('letter', "Your guess must be a letter").isAlpha();
  let errors = req.validationErrors();
  let letter = req.body.letter;

  if (errors) {
    res.render("hangman", {
      errors,
      display,
      limit,
      guess,
    });
    console.log("error");
  } else {
    guess.forEach(function(e) {
      // check 2 - same letter
      if (e === letter) {
        wrong = false;
        res.render("hangman", {
          display,
          limit,
          guess,
          double: "you already guessed that letter"
        });
      }
    });

    word.forEach(function(e) {
      // check 3 - correct
      if (letter === e) {
        wrong = false;
        let push = word.indexOf(letter)
        display.splice(push, 1, letter);
        console.log('display after guess', display);
        console.log("word", word);

      } else {
        wrong = true;
      }
    })
  }
guess.push(letter);
let displayString = display.toString();
let wordString = word.toString();
console.log("string",displayString);
console.log("string",wordString);
if (displayString === wordString) {
  res.redirect('/win')
}
else if (limit === 0){
  res.redirect('/again', {word})
} else {
  res.render('hangman', {
    display,
    limit,
    guess
  });
}

  if (wrong = true) {
    limit -= 1;
  }


});

app.listen(3000, function() {
  console.log('Successfully started express application!');
})
