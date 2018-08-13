let cell = document.querySelectorAll(".game-item");
let result = document.getElementById("result-game");
let message = document.getElementById("message");
let reset = document.getElementById("reset-game");
let player = "X";
let step = 0;
let winArr = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];

for (let i = 0; i < 9; i++) {
    cell[i].addEventListener("click", currentStep);
}

function currentStep(){
    num = +this.getAttribute("data-sell");
    if(!this.textContent && step !== 9){
        this.innerText = player;
        player === "X" ? this.classList.add("x") : this.classList.add("o");
        player === "X" ? player = "O" : player = "X";
        message.innerText = "Player " + player;
        step++;
        winCheck(winArr, num);
        if(step == 9) {
            message.innerText = "Game over";
            result.innerText = "Draw";
        }
    }
}

function winCheck(winArr, num) {
    for(w = 0;  w < winArr.length; w++) {
        for(j = 0; j < 3; j++) {
            if(winArr[w][j] === num){
                if(player === "X") {
                    winArr[w][j] = 0;
                }
                if(player === "O") {
                    winArr[w][j] = -100;
                }
            }
            let sum = winArr[w][0] + winArr[w][1] + winArr[w][2];
            if(sum === 0) {
                result.innerText = "0 won";
                message.innerText = "Game over";
                for (i = 0; i < 9; i++) {
                    cell[i].removeEventListener("click", currentStep);
                }

            } else if(sum === -300) {
                result.innerText = "X won";
                message.innerText = "Game over";
                for (i = 0; i < 9; i++) {
                    cell[i].removeEventListener("click", currentStep);
                }
            }
        }
    }
}

reset.addEventListener("click", function (){
    for (i = 0; i < 9; i++) {
        cell[i].textContent = "";
        cell[i].classList.remove("x");
        cell[i].classList.remove("o");
        player = "X";
        step = 0;
        winArr = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ];
        result.innerText = "";
        message.innerText = "Player " + player;
        cell[i].addEventListener("click", currentStep);
    }
});