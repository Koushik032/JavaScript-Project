let buttons = document.querySelectorAll(".btn");
let resetBtn = document.querySelector(".reset_btn");
let messageContainer = document.querySelector(".message-container");
        let message = document.querySelector(".message");
        let gameBoard = document.querySelector(".game-board");

        let turn0 = true;
        let moveCount = 0;

        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                if (button.innerText !== "" || message.innerText.includes("won")) return;
                
                button.innerText = turn0 ? "O" : "X";
                button.style.color = turn0 ? "#f59e0b" : "#3b82f6";
                turn0 = !turn0;
                button.disabled = true;
                moveCount++;

                checkWinner();
            });
        });

        const checkWinner = () => {
            for (let pattern of winningPatterns) {
                let pos1 = buttons[pattern[0]].innerText;
                let pos2 = buttons[pattern[1]].innerText;
                let pos3 = buttons[pattern[2]].innerText;

                if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
                    let winner = pos1 === "O" ? "Player 1 (O)" : "Player 2 (X)";
                    showMessage(`${winner} Won! 🎉`, "animate__tada");
                    
                    // Highlight winning cells
                    pattern.forEach(index => {
                        buttons[index].classList.add("winning-cell");
                    });
                    
                    disableButtons();
                    return;
                }
            }
            
            if (moveCount === 9) {
                showMessage("Match Draw! ", "animate__fadeIn");
            }
        };

        const showMessage = (text, animation) => {
            message.innerText = text;
            messageContainer.classList.remove("hidden");
            messageContainer.classList.add("animate__animated", animation);
        };

        const disableButtons = () => {
            buttons.forEach(button => {
                button.disabled = true;
            });
        };

        resetBtn.addEventListener("click", () => {
            buttons.forEach(button => {
                button.innerText = "";
                button.disabled = false;
                button.classList.remove("winning-cell");
                button.style.color = "";
            });
            
            messageContainer.classList.add("hidden");
            messageContainer.classList.remove("animate__tada", "animate__fadeIn");
            turn0 = true;
            moveCount = 0;
        });