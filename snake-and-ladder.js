document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const rollButton = document.getElementById('rollButton');
    const status = document.getElementById('status');
    const player1PositionElem = document.getElementById('player1Position');
    const player2PositionElem = document.getElementById('player2Position');

    let player1Position = 1;
    let player2Position = 1;
    let currentPlayer = 1;

    // Define snakes and ladders
    const snakesAndLadders = {
        2: 23,    8: 34,   15: 6,    25: 5,
        33: 49,   42: 60,  47: 19,   62: 81,
        70: 89,   85: 48,  92: 73,   99: 7
    };

    function setupBoard() {
        board.innerHTML = '';
        for (let i = 100; i >= 1; i--) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = i;
            if (i === player1Position) cell.classList.add('player1');
            if (i === player2Position) cell.classList.add('player2');
            board.appendChild(cell);
        }
    }

    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    function movePlayer(player, steps) {
        if (player === 1) {
            player1Position += steps;
            if (player1Position > 100) player1Position = 100;
        } else {
            player2Position += steps;
            if (player2Position > 100) player2Position = 100;
        }
        handleSnakesAndLadders();
        updateBoard();
        checkWinner();
    }

    function handleSnakesAndLadders() {
        if (snakesAndLadders[player1Position]) player1Position = snakesAndLadders[player1Position];
        if (snakesAndLadders[player2Position]) player2Position = snakesAndLadders[player2Position];
    }

    function updateBoard() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => cell.classList.remove('player1', 'player2'));
        cells[player1Position - 1].classList.add('player1');
        cells[player2Position - 1].classList.add('player2');
        player1PositionElem.textContent = player1Position;
        player2PositionElem.textContent = player2Position;
    }

    function checkWinner() {
        if (player1Position === 100) {
            status.textContent = 'Player 1 Wins!';
            rollButton.disabled = true;
        } else if (player2Position === 100) {
            status.textContent = 'Player 2 Wins!';
            rollButton.disabled = true;
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    rollButton.addEventListener('click', () => {
        const diceRoll = rollDice();
        status.textContent = `Player ${currentPlayer} rolled a ${diceRoll}`;
        movePlayer(currentPlayer, diceRoll);
    });

    setupBoard();
});
