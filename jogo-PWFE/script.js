// Initial Data
let frame = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: ''
}

let player = '';
let warning = '';
let playing = false;

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick)
});

// Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing &&  frame[item] === '') {
        frame[item] = player;
        renderFrame();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for (let i in frame) {
        frame[i] = '';
    }

    playing = true;

    renderFrame();
    renderInfo();
}

function renderFrame() {
    for (let i in frame) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = frame[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;

    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'Player 1 venceu!'
        playing = false;
    } else if (checkWinnerFor('o')) {
        warning = 'Player 2 venceu!'
        playing = false;
    } else if (isFull()) {
        warning = 'Empate!'
        playing = false;
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => frame[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (let i in frame) {
        if (frame[i] === '') {
            return false;
        }
    }

    return true;
}
