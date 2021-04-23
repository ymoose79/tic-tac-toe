const btnChoose = document.querySelector('.btn-choose');
const modal = document.querySelector('.choice-modal');
const overlay = document.querySelector('.overlay');
const btnX = document.querySelector('.btn-X');
const btnO = document.querySelector('.btn-O');


//  ********--------    add/remove "hidden" elements   ------**********
const removeHidden = function(x){
    document.querySelector(x).classList.remove('hidden');
}
const addHidden = function(add){
    document.querySelector(add).classList.add('hidden');
}


//  *****-----  OPEN choose-MODAL : boiler plate ------*****

const openChooseModal = function () {
    removeHidden('.choice-modal');
    removeHidden('.btn-X');
    removeHidden('.btn-O');
    removeHidden('.overlay');

    gameState = ["", "", "", "", "", "", "", "", ""]
    addHidden('.P1-x');
    addHidden('.P2-o');
    addHidden('.P2-x');
    addHidden('.P1-o');
}

const hideAfterPlayer1Chooses = function(){
    addHidden('.choice-modal');
    addHidden('.btn-X');
    addHidden('.btn-O');
    addHidden('.overlay');
    addHidden('.btn-choose');
}

let player1;
let currentPlayer;
let activeGame; 
let gameState;

const init = function () {
    let player1;
    let currentPlayer;
    let activeGame = false;
    let gameState = ["", "", "", "", "", "", "", "", ""]

    // adds a click event to all cells then calls a funtion to handle assign it
    if (activeGame = true) { document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick)) };
}

//  adding element after the fact...************-----------
const message = document.createElement('div');
const left = document.querySelector('.left');
const btnAgain = document.createElement('button');


//  Eng Game Modal to restart Game...************-----------
let endGameModal = function () {
    removeHidden('.overlay');
    message.classList.add('choice-modal');
    left.prepend(message);
}




//          OPENS Modal ******************************
btnChoose.addEventListener('click', function () {
    openChooseModal();
   
});


//         player1 chooses X       ***************************

btnX.addEventListener('click', function () {
    
    init();

    removeHidden('.P1-x');
    removeHidden('.P2-o');
    
    addHidden('.P2-x');
    addHidden('.P1-o');

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = ' ');

    hideAfterPlayer1Chooses();
    currentPlayer = "X";
    player1 = "X";

})

//         player1 chooses O       ***************************

btnO.addEventListener('click', function () {
    
    init();

    removeHidden('.P1-o');
    removeHidden('.P2-x');

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = ' ');

    addHidden('.P1-x');
    addHidden('.P2-o');

    hideAfterPlayer1Chooses();
    currentPlayer = "O";
    player1 = "O";
})




// ************************************************************
//        tic tac toe board adapted from  "pure and simple tic tac toe"
//      the following list of functions come directly from the above site, however,
//      they've been modified to greater or lesser degrees
//      the following funtion only had a minor tweak
// ************************************************************

//         game code      ***************************
//        grab the cell Index     ***************************

function handleCellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;
    // below gives corresponding cell index
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //  delete this line to let the game decide if final clicked cell is a winner or draw?...

    if (gameState[clickedCellIndex] !== '') /* !== "" || !gameActive) */ {
        return;
    }       

    // clickedCell = html, clickedCellIndex for the gameState[]
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}


// ************************************************************
//        copy and pasted this portion from "pure and simple tic tac toe"
//      I wasn't sure how to handle the games grid, so after copying, 
//      just made sure I understood what was happening
// ************************************************************


function handleCellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

const winning = [  //  gameState[-,-,-,-,-,-,-,-,-]
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]


// ***********************************************************
//                  decide if game's won;
// this is almost entirely me, save for the for(loop) that runs through 
// the "winning[]" and assigns values to (a, b, c) from their corresponding
// index of the "gameState[]"
//  
// ***********************************************************
const handleResultValidation = function () {
   
    // I call things like this "boiler Plates" becuase there just basic things 
    //  that need to occur whenever certain things are happening.I put this 
    // click event on a new button created after the fact that's embedded 
    // in the message(div) i added after I had already done my CSS
    // .Really didn't feel like changing anything after all was said and 
    // done, and the time of this happened to correspond with what I'm 
    // currently working on in my Udemy course.

    //  *****------  Btn:  Boiler Plate  --------*********
    const clickEvent = function () {
        document.querySelector('.btnAgain').addEventListener('click', function () {
            message.remove();
            openChooseModal();
        })
    }
    
    //  *****------  activeGame? = true/false  --------*********
    activeGame = gameState.some(cellVal => cellVal === "");
    
    // *****-------  Winner? = true/false  --------*********
    for (i = 0; i < winning.length; i++) {
        const win = winning[i];
        let a = gameState[win[0]];
        let b = gameState[win[1]];
        let c = gameState[win[2]];
        aWinner = a === b && b === c && a !== '';


        // i kept the following as "Dry" as I could, though I'm sure there's a way simplify it further.  I would have like to put some things in the endGameModal() BoilerPlate but because of the ${b} and the <button> in the message.innerHTML, this was the best I could do.
        
        
        if (activeGame) {
            console.log(activeGame);
            if (aWinner) {
                endGameModal()
                
                message.innerHTML = `The <strong> ${b}'s </strong> Win!!!! <br> <button class="btn btnAgain">Play Again!</button>`;
            
                activeGame === false;
                clickEvent();
                return;
            }
        } else {
            if (aWinner) {
                endGameModal()
                
                message.innerHTML = `The <strong> ${b}'s </strong> Win!!!! <br> <button class="btn btnAgain">Play Again!</button>`;
            
                activeGame === false;
                clickEvent();
                return;
            } else {
                endGameModal()
                                
                message.innerHTML = `It's a <strong> Draw!!! </strong> <br> <button class="btn btnAgain">Play Again!</button>`;
                
                clickEvent();
            }
        }
    }
}
