document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Posiciones ganadoras
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    // Crear celdas
    gameState.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        board.appendChild(cell);
    });

    function checkWinner() {
        let roundWon = false;
        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `¡Jugador ${currentPlayer} ha ganado!`;
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.textContent = "¡Empate!";
            gameActive = false;
            return;
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (gameState[index] !== "" || !gameActive) return;

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        checkWinner();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (gameActive) {
            statusText.textContent = `Turno de: ${currentPlayer}`;
        }
    }

    function resetGame() {
        gameState.fill("");
        document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
        currentPlayer = "X";
        gameActive = true;
        statusText.textContent = "Turno de: X";
    }

    board.addEventListener("click", handleCellClick);
    resetButton.addEventListener("click", resetGame);
});
