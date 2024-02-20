const container = document.getElementById("grid-container");
let randomColor = false;
let bars = true;
let eraser = false;

function randomColours() {
    randomColor = !randomColor;
    let button = document.getElementById("randomiseColours");
    if (randomColor) {
        button.innerHTML = "Back to normal";
    } else {
        button.innerHTML = "Random Colours";
    }
}

function setEraser() {
    eraser = !eraser;
    let button = document.getElementById("setEraser");
    if (eraser) {
        button.innerHTML = "Eraser: On";
        button.style.backgroundColor = "pink";
    } else {
        button.innerHTML = "Eraser: Off";
        button.style.backgroundColor = "white";
    }
}

function setBars() {
    bars = !bars;
    updateBars();
}

function requestSize() {
    let size = parseInt(prompt("Enter size of grid from 1 to 100 here"));
    console.log(size);
    if (isNaN(size) || size >= 101) {
        alert("Enter a number from 1 to 100");
    } else {
        clearGrid(size);
    }
}

function clearGrid(size) {
    container.innerHTML = ""; // Clear the grid container
    makeGrid(size); // Recreate the grid with the specified size
    updateResetButton(size);
}

function updateResetButton(size) {
    const resetButton = document.getElementById("resetButton");
    resetButton.setAttribute("onclick", `clearGrid(${size})`); // Set onclick attribute with the current size
}

function updateBars() {
    if (bars) {
        let button = document.getElementById("removeBars");
        button.innerHTML = "Remove Grid lines";
        let squares = document.getElementsByClassName("square");
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.border = "1px solid black";
        }
    } else {
        let button = document.getElementById("removeBars");
        button.innerHTML = "Add Grid lines";
        let squares = document.getElementsByClassName("square");
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.border = "none";
        }
    
    }
}

function makeSquare(size) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.setAttribute("style", `--size: ${size}; background-color: white;`);

    squareDiv.addEventListener("mousemove", function (event) {
        if (event.buttons === 1) { // Check if the left mouse button is pressed
            if (randomColor) {
                squareDiv.classList.remove("permament-color");
                squareDiv.classList.add("random-color");
                if (eraser) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = getRandomRGB();
                }
            } else {
                squareDiv.classList.remove("random-color");
                squareDiv.classList.add("permament-color");
                if (eraser) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = document.getElementById("favcolor").value;
                }
            }
        }
    });

    return squareDiv;
}


function makeGrid(size) {
    for (let i = 0; i < size ** 2; i++) {
        container.appendChild(makeSquare(size));
    }
}

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let size = 16;
makeGrid(size);
updateResetButton(size);