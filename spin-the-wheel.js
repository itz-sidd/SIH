document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const status = document.getElementById('status');
    const playersList = document.getElementById('playersList');
    const addPlayerButton = document.getElementById('addPlayerButton');
    const playerNameInput = document.getElementById('playerName');

    let players = [];
    let currentRotation = 0;

    function addPlayer(name) {
        if (name && !players.includes(name)) {
            players.push(name);
            updatePlayersList();
        }
    }

    function updatePlayersList() {
        playersList.innerHTML = '';
        players.forEach(player => {
            const playerDiv = document.createElement('div');
            playerDiv.className = 'player';
            playerDiv.textContent = player;
            playersList.appendChild(playerDiv);
        });
    }

    function spinWheel() {
        if (players.length === 0) {
            status.textContent = 'No players to spin!';
            return;
        }
        const spinDegrees = Math.floor(Math.random() * 360) + 3600; // At least 10 spins
        currentRotation = (currentRotation + spinDegrees) % 360;
        wheel.style.transform = `rotate(${currentRotation}deg)`;
        setTimeout(() => {
            const winnerIndex = Math.floor(players.length * (currentRotation / 360)) % players.length;
            status.textContent = `Winner: ${players[winnerIndex]}`;
        }, 4000); // Match the duration of the spin
    }

    spinButton.addEventListener('click', spinWheel);
    addPlayerButton.addEventListener('click', () => {
        const playerName = playerNameInput.value.trim();
        playerNameInput.value = '';
        addPlayer(playerName);
    });
});
