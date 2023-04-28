const word = "APPLE";
let currentRow = 1;
const maxRows = 6;

function autoTab(rowNum, origCell, nextCol, inputSize) {
    let row = document.querySelector(`[row="${rowNum}"]`);
    let startCell = row.querySelector(`[col="${origCell}"]`);
    let nextCell = row.querySelector(`[col="${nextCol}"]`);

    if (startCell.value.length == inputSize) {
        nextCell.focus();
    }
}

function checkAnswer() {
    let trialArray = [];
    let correctGuesses = 0;
    let row = document.querySelector(`div.grid[row="${currentRow}"]`);
    let wordArray = word.split("");

    for (let i = 0; i < 5; i++) {
        trialArray.push(row.querySelector(`[col="${i}"]`).value.toUpperCase());
    }

    // Check if trialArray === word 

    for (let i = 0; i < 5; i++) {
        if (word[i] == (trialArray[i]) && wordArray.includes(trialArray[i])) {
            greenGrid(i);
            correctGuesses++;
            wordArray.splice(wordArray.indexOf(trialArray[i]), 1);
        } else if (trialArray[i] != word[i] && wordArray.includes(trialArray[i])) {
            yellowGrid(i);
            wordArray.splice(wordArray.indexOf(trialArray[i]), 1);
        }
    }

    if (correctGuesses == 5) {
        gameWon();
    } else if (correctGuesses != 5 && currentRow < maxRows) {
        // disable current row and go to next row
        let inputs = row.querySelectorAll('input');
        inputs.forEach(input => input.disabled = true);
        nextRow();
    } else {
        //Print "You lost! Better luck next time"
        resetGame();
    }
    //document.getElementById("row1").innerHTML = green + " " + yellow;
}

function nextRow() {
    currentRow++;
    let row = document.querySelector(`div.grid[row="${currentRow}"]`);
    let inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.disabled = false);
}

function greenGrid(index) {
    let row = document.querySelector(`div.grid[row="${currentRow}"]`);

    row.querySelector(`[col="${index}"]`).classList.replace("cell", "green");
}

function yellowGrid(index) {
    let row = document.querySelector(`div.grid[row="${currentRow}"]`);

    row.querySelector(`[col="${index}"]`).classList.replace("cell", "yellow");
}

function gameWon() {
    //Alert box that includes number of tries it took to win and resetGame button
}

function resetGame() {
    location.reload();
}
/* 
Create button with keypress = enter to submit line when complete
on submit, store values entered in array
function to check if any of the values in array match the values in the word
    if they match, but the index is wrong, change cell color to yellow
    if they match, and the index is correct, change cell color to green
    if  all match and all indexes are correct, change all cells to green and running = "false" - game over
on delete, auto tab back to previous input
Make rows 2-6 unaccessible until the previous row has been entered
regex to make sure input is only alphabet characters

*/

/*

checkAnswer()
- compares each element of trialArray to each element of word
- if element of trialArray is in word but index != index of the element in word, call yellowGrid()
- if element of trialArray is in word && index == iindex of element in word, call greenGrid()
- if all grids == green, call gameWon()

if not all grids are green and row < 6, call changeRows()

*/