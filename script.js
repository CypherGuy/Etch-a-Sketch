const container = document.getElementById("grid-container");
let randomColor = false;
let bars = true;

function randomColours() {
    randomColor = !randomColor;
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
        let squares = document.getElementsByClassName("square");
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.border = "1px solid black";
        }
    } else {
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

    squareDiv.addEventListener("mouseenter", function () {
        if (randomColor) {
            squareDiv.classList.remove("permament-color");
            squareDiv.classList.add("random-color");
            squareDiv.style.backgroundColor = getRandomRGB();
        } else {
            squareDiv.classList.remove("random-color");
            squareDiv.classList.add("permament-color");
            squareDiv.style.backgroundColor = "rgb(0, 255, 132)"; // This overrides the random colour on hover
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