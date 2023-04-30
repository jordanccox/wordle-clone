// Store words to pick from

const dictionary = ["scale", "happy", "twice", "whose", "mince", "chops", "cheap", "tread", "break", "brake", "heart", "yeast"];
// Generate random word for each new game
function randomWord(num, array) {
    let randomNum = Math.floor(Math.random() * num);
    return array[randomNum].toUpperCase();
}
// Assign randomWord to word variable
const word = randomWord(dictionary.length, dictionary);
let currentRow = 1;
const maxRows = 6;

// Auto tab to next input grid
function autoTab(rowNum, origCell, nextCol, inputSize) {
    const row = document.querySelector(`[row="${rowNum}"]`);
    const startCell = row.querySelector(`[col="${origCell}"]`);
    const nextCell = row.querySelector(`[col="${nextCol}"]`);

    if (startCell.value.length == inputSize) {
        nextCell.focus();
    }
}

// Tab to next row
function autoNextRow(rowNum) {
    const nextRow = document.querySelector(`[row="${rowNum}"]`);
    const firstCell = nextRow.querySelector(`[col="0"]`);

    firstCell.focus();
}

// Toggle input attribute disabled
function toggleDisabled() {
    const row = document.querySelector(`div.grid[row="${currentRow}"]`);
    let inputs = row.querySelectorAll('input');
    inputs.forEach(input => input.toggleAttribute("disabled"));
}

// Enter button variable
const enter = document.querySelector("#enterBtn");

// Enter keypress --> checkValidInput()
document.addEventListener("keypress", (event) => {
    if (event.keyCode === 13) {
        checkValidInput();
    }
});

// Enter --> checkValidInput()
enter.addEventListener("click", checkValidInput);

function checkValidInput() {
    const regex = /[A-Z]{5}/;
    let guesses = [];
    const row = document.querySelector(`div.grid[row="${currentRow}"]`);

    for (let i = 0; i < 5; i++) {
        guesses.push(row.querySelector(`[col="${i}"]`).value.toUpperCase());
    }

    guesses = guesses.join("");

    if (regex.test(guesses)) {
        checkAnswer(guesses);
    } else {
        window.alert("Please fill in all the grids (letters only) and try again");
    }

}

// Auto backspace to previous grid
document.addEventListener("keyup", (event) => {
    if (event.keyCode === 8) {
        const row = document.querySelector(`div.grid[row="${currentRow}"]`);
        const currentCell = document.activeElement;

        if (currentCell.dataset.col > 0) {
            const prevCellNum = currentCell.dataset.col - 1;
            const prevCell = row.querySelector(`[col="${prevCellNum}"]`);
            
            prevCell.focus();
        }
    }
});

// If input pattern is only letters, check if the input matches the word
function checkAnswer(guesses) {
    let correctGuesses = 0;
    const row = document.querySelector(`div.grid[row="${currentRow}"]`);
    const wordArray = word.split("");

    // Check if guesses === word 

    // Iterate over guesses to find correct letter and index
    for (let i = 0; i < 5; i++) {
        if (word[i] == (guesses[i]) && wordArray.includes(guesses[i])) {
            greenGrid(i);
            correctGuesses++;
            wordArray.splice(wordArray.indexOf(guesses[i]), 1);
        }
    }

    // Iterate over guesses again to find remaining correct letters but incorrect indexes
    for (let i = 0; i < 5; i++) {
        if (guesses[i] != word[i] && wordArray.includes(guesses[i])) {
            yellowGrid(i);
            wordArray.splice(wordArray.indexOf(guesses[i]), 1);
        }
    }

    if (correctGuesses == 5) {
        gameWon();
    } else if (correctGuesses != 5 && currentRow < maxRows) {
        // disable current row and go to next row
        toggleDisabled();
        nextRow();
        autoNextRow(currentRow);
    } else {
        //Print "You lost! Better luck next time"
        //resetGame();
    }
    //document.getElementById("row1").innerHTML = green + " " + yellow;
}

function nextRow() {
    currentRow++;
    toggleDisabled();
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
    toggleDisabled();
}

function resetGame() {
    // Add alert box saying you lost
    // disable inputs
    location.reload(); // Add 10 second timeout
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