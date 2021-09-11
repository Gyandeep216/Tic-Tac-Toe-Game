//variables
const x_class = "x";
const circle_class = "circle";
const Winning_combinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn = false;
let winningScore = 0;
let xScore = 0;
let oScore = 0;
let draws = 0;

// Selectors
const cellElements = document.querySelectorAll('[data-cell]');
const xTurn = document.querySelector('.Xturn');
const oTurn = document.querySelector('.Oturn');
const wonText = document.querySelector('.wonText');
const playArea = document.querySelector('.playArea');
const playBoard = document.querySelector('.playBoard');
const resultBox = document.querySelector('.resultBox');
const rounds = document.querySelector('#options');
const options = document.querySelector('.options');
const drawDisplay = document.querySelector('.draws');
const xDisplay = document.querySelector('.playerX-wins');
const oDisplay = document.querySelector('.playerO-wins');
const btn = document.querySelector('.btn');
const roundWinBox = document.querySelector('.roundWinMsgBox');
const roundWinMsg = document.querySelector('.roundWinMsg');


// EventListeners
startOver();
function startOver(){
    cellElements.forEach(cell=>{
        cell.addEventListener('click', handleClick, {once : true});
    })
}

rounds.addEventListener('change',()=>{
    winningScore = parseInt(rounds.value);
    options.style.display = 'none';
    playBoard.style.display = 'flex';
})

btn.addEventListener('click',restart);


// Functions
function handleClick(e){
    const cell = e.target;
    const currentClass = circleTurn ? circle_class : x_class;
    xTurn.classList.toggle('active');
    oTurn.classList.toggle('active')
    placeMark(cell,currentClass);

    //check win
    if(checkWin(currentClass)){
       endGame(false);
    }else if(isDraw()){
        endGame(true);
    }


    // switch turns
    swapTurns();
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
    if(circleTurn){
        cell.innerHTML = '<i class = "far fa-circle" ></i>';
    }else{
        cell.innerHTML = '<i class = "fas fa-times" ></i>';
    }
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function checkWin(currentClass){
    return Winning_combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw){

    if(draw){
        draws++;
        drawDisplay.innerText = `${draws} Draws`;
        roundWinMsg.innerText = 'This round has resulted in a draw !'
        playArea.style.display = 'none';
        roundWinBox.style.display = 'flex';
    }else{
        playArea.style.display = 'none';
        roundWinBox.style.display = 'flex';

        if(circleTurn){
            oScore++;
            oDisplay.innerText = `${oScore} Wins`;
            roundWinMsg.innerText = 'Player O wins this round !'
        }else{
            xScore++;
            xDisplay.innerText = `${xScore} Wins`;
            roundWinMsg.innerText = 'Player X wins this round !'
        } 

    }

    setTimeout(resetBoard,1200);

    if(draws + xScore + oScore == winningScore){
        if(xScore > oScore){
            wonText.innerHTML = `Player X has won the game! <br><br> The final Scores are : <br> Player X : ${xScore} <br> Player O : ${oScore} <br> Draws : ${draws}`
        }else if (oScore > xScore){
            wonText.innerHTML = `Player O has won the game! <br><br> The final Scores are : <br> Player X : ${xScore} <br> Player O : ${oScore} <br> Draws : ${draws}`
        }else{
            wonText.innerHTML = `The Game is draw! <br><br> The final Scores are : <br> Player X : ${xScore} <br> Player O : ${oScore} <br> Draws : ${draws}`;
        }

        setTimeout(() => {
            playBoard.style.display = 'none';
            resultBox.style.display = 'block';
        },1200);    
    }   
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) ||
        cell.classList.contains(circle_class);
    })
}

function resetBoard(){

    [...cellElements].forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(circle_class);
        cell.innerHTML='';
    });

    playArea.style.display = 'block';
    roundWinBox.style.display = 'none';

    startOver();
}

function restart(){
    location.reload();
}