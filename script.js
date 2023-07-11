//note for Extra Credit  
// for Rather than a simple color change from black to white, each interaction should randomize the square’s RGB value entirely.
// we can create a array and randomize a value and give it to backgroundColour attribute each time so we get a pool of colors

function randomColor(){
  const colorArr = ["#9400D3", "#4B0082","#0000FF","#00FF00","#FFFF00","#FF7F00	","#FF0000"];
  let getRandom = Math.floor(Math.random() * colorArr.length);

  return colorArr[getRandom];
}


// access the sketch-container

const sketchContainer = document.getElementById("sketch-container");

// Variables to track mouse state within each cell
let isCellClicked = false;


// an event listener is added to the sketchContainer element for the mousedown event. Inside the event listener, we call event.preventDefault() to disable the default behavior of dragging an image or text selection when clicking within the container.By preventing the default drag behavior, you should no longer experience the issue of dragging an image and inadvertently coloring the grid without clicking the mouse button.


sketchContainer.addEventListener("mousedown", (event) => {
  event.preventDefault();
});


//16x16 matrix

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      //creating the grids
      const cell = document.createElement('div');
      cell.classList.add('matrix-cell');
      cell.setAttribute("id", "color-cell");
      sketchContainer.appendChild(cell);
      
      // to change the color of the div when we click on it
      // Add event listener to each cell for coloring while dragging
      //when we click on the mouse color changes
      cell.addEventListener("mousedown", () => {
        isCellClicked = true;
        cell.style.backgroundColor = randomColor();
      });
  
      // when we click the mouse and hover over the grids the effect still there

      cell.addEventListener("mouseover", () => {
          if(isCellClicked){
            cell.style.backgroundColor = randomColor();
          }
      });

      // we disable the effect as we stop clicking the mouse

      cell.addEventListener("mouseup", () => {
        if(isCellClicked){
          isCellClicked = false;
        }
      });

      // Add transition effect
      cell.style.transition = "background-color 0.3s ease";
    }
}

// creating an erase button

const eraseButtonContainer = document.createElement('div');
const eraseButton = document.createElement('button');

//giving classes
eraseButtonContainer.classList.add('erase-button-container');
eraseButton.classList.add('erase-button');

//appending eraseButton to eraseButtonContainer
eraseButtonContainer.appendChild(eraseButton);

// Set attributes of button
eraseButton.setAttribute('type', 'button');
eraseButton.textContent = 'ERASE';

// appending the erase button container after the sketchConatiner
//"afterend": Inserts the element as a following sibling, just after the sketchContainer.
sketchContainer.insertAdjacentElement('afterend', eraseButtonContainer);


//functionality to erase button
// when we press the default button the color from the grid goes back to normal

// we select all the grid cells
const gridCells = document.querySelectorAll(".matrix-cell");

// function to reset all the grids
function resetGridCells() {
  gridCells.forEach((cell) => {
    cell.style.backgroundColor = "#eee";
  });
}



// Add event listener to erase button
eraseButton.addEventListener("click", resetGridCells);