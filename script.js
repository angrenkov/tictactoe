let cell = document.querySelectorAll('.game-item');
let result = document.getElementById('result-game');
let modal = document.getElementById('myModal');
let pModal = document.getElementById('players');
let span = document.getElementsByClassName('close')[0];
let message = document.getElementById('message');
let reset = document.getElementsByClassName('reset')[0];
let playerOne = document.getElementById('p1');
let playerTwo = document.getElementById('p2');
let setNames = document.getElementById('setNames');
let player;
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

window.onload = function(){
    document.addEventListener('click', resetGame);
    pModal.style.display = 'block';
};

for (let i = 0; i < 9; i++) {
    cell[i].addEventListener('click', currentStep);
}

function currentStep(){
    let num = parseInt(this.getAttribute('data-sell'));

    if(!this.textContent && step !== 9){
        this.innerText = player;
        player === 'X' ? this.classList.add('x') : this.classList.add('o');
        player = (player === 'X') ? 'O' : 'X';
        message.innerText = 'Player ' + player;
        step++;
        checkWin(winArr, num);

        if(step === 9) {
            message.innerText = 'Game over';
            modal.style.display = 'block';
            result.innerText = 'Draw';
        }
    }
}

function checkWin(winArr, num) {
    for (let w = 0;  w < winArr.length; w++) {
        for (let j = 0; j < 3; j++) {
            if (winArr[w][j] === num){
                if (player === 'X') {
                    winArr[w][j] = 0;
                }
                winArr[w][j] = (player === 'X') ? 0 : -100;
            }
            let sum = winArr[w][0] + winArr[w][1] + winArr[w][2];
            if (sum === 0) {
                modal.style.display = 'block';
                mapWinnerToView('O');
                message.innerText = 'Game over';
                for (let i = 0; i < 9; i++) {
                    cell[i].removeEventListener('click', currentStep);
                }
            } else if (sum === -300) {
                modal.style.display = 'block';
                mapWinnerToView('X');
                message.innerText = 'Game over';
                for (let i = 0; i < 9; i++) {
                    cell[i].removeEventListener('click', currentStep);
                }
            }
        }
    }
}

function resetGame(e){
    if (e.target && e.target.className === 'reset') {
        for (let i = 0; i < 9; i++) {
            cell[i].textContent = '';
            cell[i].classList.remove('x');
            cell[i].classList.remove('o');
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
            result.innerText = '';
            message.innerText = 'Player ' + player;
            cell[i].addEventListener('click', currentStep);
            modal.style.display = 'none';
        }
        startGame();
    }
}

span.onclick = function(){
    modal.style.display = 'none';
};

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
};

setNames.onsubmit = function (e) {
    document.getElementById('first').innerHTML = playerOne.value || 'Player 1';
    document.getElementById('second').innerHTML = playerTwo.value || 'Player 2';
    document.getElementById('first').innerHTML += ' (X)';
    document.getElementById('second').innerHTML += ' (O)';
    pModal.style.display = 'none';
    startGame();
    return false;
};

function selectPlayer() {
    const randomResult = Math.floor(Math.random()*2);
    player = randomResult? 'X' : 'O';
}

function mapWinnerToView(winner) {
    let block = document.createElement('div');
    block.innerText = winner + ' won';
    document.getElementById('result-game').appendChild(block);
}


function startGame() {
    selectPlayer();
}