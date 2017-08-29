const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const wordList = require('./models/words');
const hangman = {};
const app = express();
let word;
let wrong = true;


newGame = function() {
  display = [];
  word = wordList[Math.floor(Math.random() * wordList.length)];
  word = word.split("");
  limit = 8;
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

app.get('/newgame', function(req, res) {
  newGame();
  res.render('hangman', {
    display
  });
});

app.get('/win', function(req, res) {
  res.render('win')
})

app.get('/again', function(req, res) {
  res.render('tryagain', {
    word
  })
})
//  check 1: is it a letter?
//  check 2: is it a dublicate guess?
//  check 3: is it a correct guesss?

// Beginning of POST
app.post('/guess', function(req, res) {
  // CHECK 1 - is it a letter
  // CHECK 2 - has it been guessed
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
    // CHECK 3 - correct
    word.forEach(function(e) {
      if (letter === e) {
        wrong = false;
        let push = word.indexOf(letter)
        display.splice(push, 1, letter);

      } else {
        console.log("wrong letter")
      }
    })

    guess.forEach(function(e) {
      // check 2 - same letter
      if (e === letter) {
        wrong = false;
        res.render("hangman", {
          display,
          limit,
          guess,
          double: "you already guessed that"
        });
      }
    });
  }
  // end of if statement (if errors/else correct)

  guess.push(letter);
  let displayString = display.toString();
  let wordString = word.toString();
  console.log("string", displayString);
  console.log("string", wordString);


  if (displayString === wordString) {
    res.redirect('/win')
  } else if (limit === 0) {
    res.redirect('/again')
  } else {
    console.log("still playing")
    res.render('hangman', {
      display,
      limit,
      guess
    });
  };

  if (wrong == true) {
    limit -= 1;
  };

});
// END OF POST


app.listen(3000, function() {
  console.log('Successfully started express application!');
})
