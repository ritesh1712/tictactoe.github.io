
let turn = "x";
let gameOver = false;
let comTurn = turn;
let count = 0;
let computerChoese = [];
const boxs = document.getElementsByClassName("boxs");
const info = document.getElementById("info");
const img = document.getElementById("img");
const sound = new Audio("items/sound.mp3");
const reset = document.getElementById("reset");
const line=document.getElementById("line");

// canditions for winning
const winningConditions = [
    [0, 1, 2,20,4.5,0],
    [3, 4, 5,20,10.5,0],
    [6, 7, 8,20,16.5,0],
    [0, 3, 6,13.5,10,90],
    [1, 4, 7,20,10,90],
    [2, 5, 8,26.5,10,90],
    [0, 4, 8,19.5,10,45],
    [2, 4, 6,20.5,10,-45]
]

// change turns 
const changeTurn = () => {
    return turn === "x" ? "0" : "x";
}

// player section logic
for (box of boxs) {
    box.addEventListener('click', (e) => {

        if (!gameOver && !comTurn && e.target.innerText == "") {

            if (turn == "x") {
                e.target.innerText = "x";
                info.innerText = "turn for o"
                turn = changeTurn();
                checkWin()
                sound.play();

            }
            else {
                e.target.innerText = "0";
                turn = changeTurn();
                info.innerText = "turn for x"
                checkWin()
                sound.play();
            }
        }
    })
}


// win and drow  logic
const checkWin = () => {


    count++;
    // console.log(count)

    winningConditions.forEach(element => {

        if ((boxs[element[0]].innerText === boxs[element[1]].innerText) && (boxs[element[1]].innerText === boxs[element[2]].innerText) && (boxs[element[0]].innerText !== "")) {
            info.innerText = `win ${boxs[element[0]].innerText}`
            img.style.height = "5rem"
            gameOver = true;
            count = 0;

            // winning line print
line.style.width="14rem";
line.style.left=`${element[3]}rem`
line.style.top=`${element[4]}rem`
line.style.transform=`rotate(${element[5]}deg)`
        }

        else if (count == 9) {
            info.innerText = "draw"
            img.style.height = "0px"
            count = 0
        }

    });
}

// restart the game 
reset.addEventListener('click', () => {
    Array.from(boxs).forEach(element => {
        element.innerText = "";
        img.style.height = "0px";
        info.innerText = "turn for x"
        turn = "x";
        gameOver = false;
line.style.width="0px";


    });

})


// computer logic
const computer = document.getElementById("computer");
const player = document.getElementById("player");


// rendom number ganret for conputer turn 
const rendomNum = () => {
    return Math.floor(Math.random() * 9);

}

// switch to player 
player.addEventListener('click', () => {
    player.style.backgroundColor = "rgb(192,132,252)";
    computer.style.backgroundColor = "white";
    comTurn = false;
})

// switch to computer
computer.addEventListener('click', () => {
    computer.style.backgroundColor = "rgb(192,132,252)";
    player.style.backgroundColor = "white";
    comTurn = true;
})

// computer turn logic 
function com() {
    for (box of boxs) {
        box.addEventListener('click', (e) => {
            // player turn 
            if (!gameOver && comTurn && e.target.innerText == "") {
                if (turn == "x") {
                    e.target.innerText = "x";
                    info.innerText = "turn for o"
                    turn = changeTurn();
                    checkWin()
                    sound.play();

                }
                // computer turn 
                if (!gameOver) {
                    computerMind();
                    for (let i = 0; i <= 8; i++) {
                        setTimeout(() => {
                            computerChoese[i] = rendomNum();
                            if (turn == "0" && boxs[computerChoese[i]].innerText == "") {
                                boxs[computerChoese[i]].innerText = "0";
                                info.innerText = "turn for x"
                                turn = changeTurn();
                                checkWin();
                                sound.play();
                            }
                        }, 800);
                    }
                }
            }
        })
    }
}
com();


// comuter block the player wins 
function computerMind() {

    winningConditions.forEach(element => {

        if (boxs[element[0]].innerText !== "") {


            if ((boxs[element[0]].innerText === boxs[element[1]].innerText) && (boxs[element[2]].innerText === "")&& turn=="0") {
                boxs[element[2]].innerText = "0"
                turn = changeTurn();
                info.innerText = "turn for x"
                checkWin();
                sound.play();
                // console.log("1")
            }
            else if ((boxs[element[1]].innerText === boxs[element[2]].innerText) && (boxs[element[0]].innerText === "")&& turn=="0") {


                boxs[element[0]].innerText = "0"
                turn = changeTurn();
                info.innerText = "turn for x"
                checkWin();
                sound.play();
                // console.log("2")

            }
            else if ((boxs[element[0]].innerText === boxs[element[2]].innerText) && (boxs[element[1]].innerText === "")&& turn=="0") {


                boxs[element[1]].innerText = "0"
                turn = changeTurn();
                info.innerText = "turn for x"
                checkWin();
                sound.play();
                // console.log("3")

            }

        }

    });
}