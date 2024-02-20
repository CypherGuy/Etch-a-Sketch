const gridContainer = document.getElementById("grid-container");
let randomColors = false;
let showGridLines = true;
let eraserMode = false;

function toggleRandomColours() {
    randomColors = !randomColors;
    let button = document.getElementById("randomiseColours");
    if (randomColors) {
        button.innerHTML = "Back to normal";
    } else {
        button.innerHTML = "Random Colours";
    }
}

function toggleEraser() {
    eraserMode = !eraserMode;
    let button = document.getElementById("toggleEraser");
    if (eraserMode) {
        button.innerHTML = "Eraser: On";
        button.style.backgroundColor = "pink";
    } else {
        button.innerHTML = "Eraser: Off";
        button.style.backgroundColor = "white";
    }
}

function toggleGridLines() {
    showGridLines = !showGridLines;
    updateGridLines();
}

function changeGridSize() {
    const size = parseInt(prompt("Enter grid size (1-100):"));
    if (isNaN(size) || size < 1 || size > 100) {
        alert("Please enter a number between 1 and 100.");
    } else {
        resetSketch(size);
    }
}

function resetSketch(size) {
    gridContainer.innerHTML = ""; // Clear the grid container
    createGrid(size); // Recreate the grid with the specified size
    updateResetButton(size);
}

function updateResetButton(size) {
    const resetButton = document.getElementById("resetButton");
    resetButton.setAttribute("onclick", `resetSketch(${size})`); // Set onclick attribute with the current size
}

function updateGridLines() {
    if (showGridLines) {
        let button = document.getElementById("toggleGridLines");
        button.innerHTML = "Remove Grid lines";
        let squares = document.getElementsByClassName("square");
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.border = "1px solid black";
        }
    } else {
        let button = document.getElementById("toggleGridLines");
        button.innerHTML = "Add Grid lines";
        let squares = document.getElementsByClassName("square");
        for(let i = 0; i < squares.length; i++) {
            squares[i].style.border = "none";
        }
    
    }
}

function createSquare(size) {
    const squareDiv = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.setAttribute("style", `--size: ${size}; background-color: white;`);

    squareDiv.addEventListener("mousemove", function (event) {
        if (event.buttons === 1) { // Check if the left mouse button is pressed
            if (randomColors) {
                squareDiv.classList.remove("permanent-color");
                squareDiv.classList.add("random-color");
                if (eraserMode) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = getRandomRGB();
                }
            } else {
                squareDiv.classList.remove("random-color");
                squareDiv.classList.add("permanent-color");
                if (eraserMode) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = document.getElementById("colorPicker").value;
                }
            }
        }
    });

    squareDiv.addEventListener("click", function (event) {
        if (squareDiv.style.backgroundColor === "white"){
            if (randomColors) {
                squareDiv.classList.remove("permanent-color");
                squareDiv.classList.add("random-color");
                if (eraserMode) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = getRandomRGB();
                }
            } else {
                squareDiv.classList.remove("random-color");
                squareDiv.classList.add("permanent-color");
                if (eraserMode) {
                    squareDiv.style.backgroundColor = "white";
                } else {
                    squareDiv.style.backgroundColor = document.getElementById("colorPicker").value;
                }
            }

        } else { // Background colour is not white
            if (eraserMode) {
                squareDiv.style.opacity = '1';

            } else {
                if (!squareDiv.style.opacity  || parseFloat(squareDiv.style.opacity) === 0.0){
                    squareDiv.style.opacity = '0.9';
                } else {
                    opacity = parseFloat(squareDiv.style.opacity);
                    squareDiv.style.opacity = opacity - 0.1;
                }

            }

        }
    })

    return squareDiv;
}

function createGrid(size) {
    for (let i = 0; i < size ** 2; i++) {
        gridContainer.appendChild(createSquare(size));
    }
}

function getRandomRGB() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

let defaultSize = 16;
createGrid(defaultSize);
updateResetButton(defaultSize);