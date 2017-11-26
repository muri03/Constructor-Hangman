var wrongGuessesLeft = 0;
var wins = 0;
var losses = 0;
var wordToGuess = "";
var myWords = ["Hello", "Goodbye", "Phil", "Bootcamp", "Northwestern"];
var blanks = "";
var lettersToGuess=  ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letterButtons = "";
var correctGuessCount = 0;
var wrongGuesses = 0;

// Set up the play again function
var buttonPlayAgain = document.getElementById("playAgain");
buttonPlayAgain.style.display = "none";
buttonPlayAgain.setAttribute("onclick", "startGame()"); // restart the game

// Set up the title
var gameTitle = document.getElementById("gameStatus");

function startGame() {
    // Set up the subtitle
    gameTitle.innerHTML = "Playing!";
    gameTitle.style.color = "gold";

    wrongGuesses = 0;
    wrongGuessesLeft = 9; // Give everyone 9 "wrong" guesses
    setWrongGuesses();

    buttonPlayAgain.style.display = "none";
    wordToGuess = myWords[Math.floor(Math.random() * myWords.length)];
    correctGuessCount = wordToGuess.length; // So we can check how many correct guesses, for win
    /* Set up the page */

    // Set up blanks
    blanks = "";
    for(var i = 0; i < wordToGuess.length; i++) {
        // Create an identifiable blank/letter
        var newBlank = "<span class='letter' id='blankI_" + i + "'>_</span>";
        // Add the blank to the code
        blanks += newBlank;
    }
    console.log(blanks);

    // Insert blanks into the Word to Guess div.
    var wordToGuessH3 = document.getElementById("realWord");
    wordToGuessH3.innerHTML = blanks;
    console.log(wordToGuessH3.innerHTML);

    // Blank out the div that holds letters
    var lettersToGuessDiv = document.getElementById("letterstoguess");
    lettersToGuessDiv.innerHTML = "";

    // Set up the letters to click
    letterButtons = "";
    for(var i = 0; i < lettersToGuess.length; i++) {
        var newLetterButton = "<button class='letterToClick' data-letter='" + i + "'";

        // Add onclick action
        newLetterButton += " onclick='checkGuess(this)'";
        newLetterButton += ">" + lettersToGuess[i] + "</button>";
        
        // Add the button to the string that we will set.
        letterButtons += newLetterButton;
    }
    console.log(letterButtons);

    // Set up the div that holds the buttons
    lettersToGuessDiv.innerHTML = letterButtons;
    console.log(lettersToGuessDiv.innerHTML);

}



// Make sure to start the game
startGame();

// Create the function that is called when a letter button is clicked
function checkGuess(buttonObject) {
    // Make sure there are guesses left
    if(wrongGuessesLeft === 0) {
        alert("Sorry, you are out of guesses :(");
        return; // leaves the function
    }
    
    // Check what "I" this is in the lettersToGuess array
    var index = buttonObject.getAttribute("data-letter");

    // Convert the index to a letter
    var letterGuessed = lettersToGuess[index];

    var checkGuessBool = false; // default is that we do not guess the right letter

    // We know the index now.  Time to see if it exists in the wordToGuess var
    for(var i = 0; i < wordToGuess.length; i++) {
        // Check if this  letterGuessed variable equals the letter at this "i"
        if(wordToGuess[i].toLowerCase() === letterGuessed) { // We need to lower case this.
            // You got a letter!
            checkGuessBool = true;
            correctGuess(i, letterGuessed);
        }
    }

    console.log(wordToGuess);
    // Check if we guessed any right letters
    if(checkGuessBool === false) {
        // Subtract from the allowed guesses
        wrongGuessesLeft--;
        wrongGuesses++;
        setWrongGuesses();
    }

    // Check to see if we went over our guess count
    if(wrongGuessesLeft === 0) {
        loss();
    }

    buttonObject.parentNode.removeChild(buttonObject); // remove the button from the DOM
    
}

function setWrongGuesses() {
    document.getElementById("guesses-left").innerHTML = wrongGuessesLeft;
    document.getElementById("wrong-guesses").innerHTML = wrongGuesses;
}

function correctGuess(correctGuessIndex, letterToShow) {
    document.getElementById("blankI_"+correctGuessIndex).innerHTML = letterToShow; // set the letter to visible
    
    correctGuessCount--; // When we get to 0, the person wins!  It starts at the length of the word.
    if(correctGuessCount === 0) {
        win(); // You win!
        wrongGuessesLeft = 0;
    }
}

// Create the win function
function win() {
    wins++;
    document.getElementById("win-counter").innerHTML = wins;

    buttonPlayAgain.style.display = "block";

    gameTitle.innerHTML = "You won!";
    gameTitle.style.color = "green";
}

// Create the loss function
function loss() {
    losses++;
    document.getElementById("loss-counter").innerHTML = losses;

    buttonPlayAgain.style.display = "block";

    gameTitle.innerHTML = "You lost!";
    gameTitle.style.color = "red";

    document.getElementById("realWord").innerHTML = "";
}