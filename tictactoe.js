// Make a command line tic-tac-toe game from scratch for two players. 
// Expected features
// ===============
// * Minimal UI that redraws the board and makes clear whose turn it is, each turn.
// * Players can submit moves (assume, admittedly unrealistically, that both players are sitting at the same keyboard).
// * Win detection - detect and display who won

// Bonus / stretch goals (any or all of the following)
// =======================================
// * Structure your code such that the UI can be turned easily into a native mobile app (iOS say) without having to rewrite the core game logic.
// * Implement win detection with a functional rather than iterative style.
// * Between moves, rotate the board 90 degrees counter-clockwise. The moves "fall" due to "gravity", post-rotation.

// Implementation instructions
// =======================
// * Create the project from scratch. Don't just clone an existing project.
// * This includes writing configuration files for any dependencies and test framework setup.
// * You should have a reasonably thorough suite of unit tests using a real unit test framework.
// * Use the editor of your choice.
// * Init a git repo for this project.
// * Push the repo up to github.
// * Make small commits as you go to illustrate your thought process and be able to back out changes easily.
// * Don't forget to push your final solution up to Github.
// * Add a professional-looking README file with installation and usage instructions.

// Try your best to work on this challenge without referring to outside resources. However, if you have to look things up online, go ahead. 

// Submission instructions
// ====================
// Upon completion of your work, submit a link to the repository via this form.

// var board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
var prompt = require('prompt');

var board = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
}

var printboard = function() {
  console.log('\n' +
        ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
        ' ---------\n' +
        ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
        ' ---------\n' +
        ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n')
};

var validateInput = function(value) {
  if(isNaN(value)) {
    return false;
  } else {
    return Number(value);
  }
}

var placePlay = function(tile, player) {
  board[tile] = player;
}

var winConditions = [
                      [1, 2, 3], 
                      [4, 5, 6], 
                      [7, 8, 9], 
                      [1, 4, 7],
                      [2, 5, 8], 
                      [3, 6, 9], 
                      [1, 5, 9], 
                      [3, 5, 7]
                    ];

var checkWin = function(player) {
  var count = 0;
  var win = false;
  winConditions.forEach(function(condition, tile) {
    count = 0;
    condition.forEach(function(tile) {
      if (board[tile] === player) {
        count++;
        if (count === 3) {
          win = true;
        }
      }
    });
  });

  return win;
}

var checkTie = function() {
  for (var i = 1; i < Object.keys(board).length; i++) {
    if (!isNaN(board[i])) {
      return false;
    }
  }
  return true;
}

var play = function(player = 'X') {
  printboard();

  prompt.start();
  console.log(`Player ${player}'s turn: `)
  prompt.get(['tile'], function(err, result) {
    if (validateInput(result.tile) && board[result.tile] === Number(result.tile)) {
      placePlay(result.tile, player);
      if (checkWin(player)) {
        printboard();
        console.log(`${player} is the winner!`);
        return;
      }
      if (checkTie()) {
        console.log('The game is a tie!');
        return;
      }
      if (player === 'X') {
        play('O');
      }
      if (player === 'O') {
        play('X');
      }
    } else {
      console.log('Sorry, input a tile number');
      play(player);
    }
  });
}

console.log('GAME START!');
play();



