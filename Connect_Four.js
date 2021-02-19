// Board
var board = 7; // board of size 7x7
var toWin = 4;

// Get the players' names
// var playerOne = prompt("Player 1, your color is RED. Please enter your name: ");
// var playerTwo = prompt("Player 2, your color is BLUE. Please enter your name: ");

var defaultColor = $("td").css("background-color");
var playerOneColor = "#95B8D1";
var playerTwoColor = "#EDAFB8";

// Figure out the colour
var turn = playerOneColor;

function changeTurn(){
  if(turn == playerOneColor){
    turn = playerTwoColor;
  } else if(turn == playerTwoColor){
    turn = playerOneColor;
  }
}

// Return background colour of a cell given row and column index
function cellReturn(r, c) {
  var cell = $("tr").eq(r).find("td").eq(c) // get cell from row and column
  return cell.css("background-color");
}

// Get row and column indices and colour the bottom-most available cell
$("td").on("click", function() {
  var rowIndex = $(this).closest("tr").index();
  var colIndex = $(this).index();
  // Colour the bottom-most available cell
  for (var i = board; i >= 0; i--) {
      if(cellReturn(i, colIndex) === defaultColor){
        $("tr").eq(i).find("td").eq(colIndex).css("background-color", turn);
        changeTurn();
        i=-1;
      };
    }
  // Is the game over
  var gameOverVar = gameOver();
  if (gameOverVar == 1){
    var winner;
    if(turn==playerOneColor){
        winner = playerOne;
    } else if(turn==playerTwoColor){
      winner = playerTwo;
    }
    $("h2").text(winner + " has won! Refresh the page to play again :)");
    $("h2").css("color","green");
    }
}) // function

function gameOver(){
// Rows
for (var r = 0; r < board; r++) {
  for (var i = 0; i < toWin; i++) {
    if(
      (cellReturn(r,i) == cellReturn(r,i+1))
      && (cellReturn(r,i+1) == cellReturn(r,i+2))
      && (cellReturn(r,i+2) == cellReturn(r,i+3))
      && (cellReturn(r,i) != defaultColor)
    ){
      return 1;
    }
  }
}

// Columns
for (var c = 0; c < board; c++) {
  for (var j = 0; j < toWin; j++) {
    if(
      (cellReturn(j,c) == cellReturn(j+1,c))
      && (cellReturn(j+1,c) == cellReturn(j+2,c))
      && (cellReturn(j+2,c) == cellReturn(j+3,c))
      && (cellReturn(j,c) != defaultColor)
    ){
      return 1;
    }
  }
}

// Diagonals
for (var r = board; r >= toWin; r--) {
  for (var c = 0; c < toWin; c++) {
    if(
      (cellReturn(r-1,c-1) == cellReturn(r-2,c))
      && (cellReturn(r-2,c) == cellReturn(r-3,c+1))
      && (cellReturn(r-3,c+1) == cellReturn(r-4,c+2))
      && (cellReturn(r-1,c-1) != defaultColor)
    ){
      return 1;
    }
  }
}

for (var r = board; r >= toWin; r--) {
  for (var c = board; c >= toWin; c--) {
    if(
      (cellReturn(r-1,c-1) == cellReturn(r-2,c-2))
      && (cellReturn(r-2,c-2) == cellReturn(r-3,c-3))
      && (cellReturn(r-3,c-3) == cellReturn(r-4,c-4))
      && (cellReturn(r-1,c-1) != defaultColor)
    ){
      return 1;
    }
  }
}


} // function
