var inquirer = require('inquirer');

// var wrongGuessesLeft = 0;
// var wins = 0;
// var losses = 0;
// var wordToGuess = "";
var teams = ["Liverpool", "Manchester City", "Chelsea", "Arsenal", "Manchester United"]
var blanks = "";
// var lettersToGuess = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// var letterButtons = "";
// var correctGuessCount = 0;
// var wrongGuesses = 0;

inquirer.prompt([{
    type: "confirm",
    message: "Do you want to play hangman?",
    name: "confirm",
    default: true

}]).then(function(data) {
    if (data.confirm) {
        // getTeams();
        console.log("What are the top English Premier League teams?");
        getTeams();

    } else {
        console.log("Stick with MLS then");
    }

});

function getTeams() {

    // picks a random team
    var randomTeams = teams[Math.floor(Math.random() * teams.length)];

    // creates the blanks;
    for (var i = 0; i < randomTeams.length; i++) {
        // Create an identifiable blank/letter
        var newBlank = "_";
        // Add the blank to the code
        blanks += newBlank;
        console.log(blanks);
        guessTeam();
    }

};

function guessTeam(teams, guess) {
  this.teams = teams;
  this.guess = guess;
}