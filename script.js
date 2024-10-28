const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
let currentPlayer ='X';
let gameBoard = Array(9).fill('');
let isGameOver = false;

// Winning combinations (rows, columns, diagnols)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Initial game
function startGame() {
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
    updateStatus();
}

// Handle cell click
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');
    
    // If cell is already clicked or game is over, return
    if (gameBoard[index] !== '' || isGameOver) return;

    // Mark the cell and update the board
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.setAttribute('data-marked', 'true'); // Set data-marked attribute after marking the cell


    // Check for win or draw
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameOver = true;
    } else if (gameBoard.every(cell => cell !== '')) {
        statusText.textContent = "It's a draw!";
        isGameOver = true;
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

// Update status text 
function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if the current player has won
function checkWin() {
    const win = winningCombinations.some(combination => {
        return combination.every(index => gameBoard[index] === currentPlayer);
    });
    
    if (win) {
        statusText.textContent = `🎉 Player ${currentPlayer} Wins! 🎉`;
        statusText.classList.add('sparkling'); // Add sparkling class
        winningCombinations.forEach(combination => {
            if (combination.every(index => gameBoard[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].style.backgroundColor = 'lightgreen';
                });
            }
        });
        return true;
    }
    return false;
}

// Reset the game
function resetGame() {
    gameBoard = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = ''; // Reset background color
    });
    currentPlayer = 'X';
    isGameOver = false;
    statusText.classList.remove('sparkling'); // Remove sparkling class
    updateStatus();
}

// Start the game on load
startGame();
