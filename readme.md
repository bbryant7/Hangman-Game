[X] Set-up:
create views folder
create public folder
touch app.js folder
touch mustache file
install
  - express
  - mustache-express
  - mustache
  - body parser
  - session
  - validator

require all relevant modules
include boiler plate code for all modules
create html skeleton to render
listen function on port 3000
create get route and render mustache page
TEST AND COMMIT

Sudo Code:
[X]create data array of words
[X]create submit form for guessing game
[X]create post route for form
[X]create variable for guesses - limit = 8
[X]create an array variable for guessed letters


[X]display:
find the length of selected word
create variable called "display"
push that "amount" of _ into the display variable

[] CHECKPOINT 1 - IS LETTER UNIQUE
 keep track of guessed letters with session: make sure it has not already been guessed
  create for loop
  iterate over array of guessed letters
  if (guessed letter != array.letter[i]) { push to array of guessed letter}
  else {error: "you all ready guessed that",}

[X] CHECKPOINT 2 - IS LETTER CORRECT
 see if guess is CORRECT
  compare guess to letters in given word
  if guess is correct (letterguessed === word[i]){
    push letter to display in correct spot*****
  }
[] else guess is WRONG {
    limit -= 1
  }


****for loop cannot account for doubles, for each is kinda wonky still
[X]PUSHING LETTERS TO THE DISPLAY
  word.indexOf(guessedletter) is A NUMBER, an index position in the word
  example, word.indexOf(b) = 0
  let display[word.indexOf(guessedword)] = guessedWord

  // use a for each loop to iterate over word and push letters to display
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

[]END OF GAME
  []losing
  if (limit === 0){
    render "game over"
    button - PLAY AGAIN - play again button resets word and renders original page
  } else
  [X]winning
   if display === word{
     render You won
     button - play again
   }

[X]create errors
[X]   if nothing is entered, display error message (please submit a guess)
[X]   if a none alpha is entered, display error message (please submit a letter)
[ ]   if double letters, display you already guessed that

// validator
// app.use(expressValidator({
//   customValidators: {
//     doubleLetter: function(letter, guess){
//       return guess.includes(letter);
//     }
//   }
// }));
// req.checkBody('letter', 'You already guessed that letter.').doubleLetter(guess);

**** INCOMPLETE WORK ******
need to get custom validator to work.
If it works, can take out for each loop for double letter
can move the guess letters push command inside the else statement
should fix issue when pushing letters again, spaces and non alpha characters

losing statement, does not properly track wrong guesses
