// this is the list of variables used in the code
let cols = 3;
let rows = 3;
let cellSize;
let grid;
let initialPattern; 

function setup() {
  createCanvas(400, 400);
  cellSize = width / cols;     // establish the size of the cells based on the width of the colms and grid

  initialPattern = randomGrid(cols, rows);     // the initall pattern is equal to the create a pattern function making it easier to refer to, and by putting it in the start up it tells the code to run it as soon as the program is run
  grid = initialPattern.slice();      // the grid is equal to the "slice" of the initial pattern, slice is is used to temporarily remember a part of an array for later use, in this case, cause there is no deinfed part of the array it remembers the whole array


  startTimer(); //  run the timmer as soon as the first patter is displayed
}

function draw() {
  background('black');
  drawGrid(grid);     // run the draw grid function over and over again, because its in a draw function
}

function drawGrid(grid) {     // this function forms the grid that the users interacts with and sees
  for (let i = 0; i < cols; i++) {     // canvas is broken down into a set of columns depending on the predetermind number of columns, this is done by forming an array as long as the number of columns in a for-loop
    for (let j = 0; j < rows; j++) {     // each column (array) is then given its own sub array that is as large as the number of rows. 
      //So if cols = 3 and rows = 3 then there will be an array with 3 elements in it representing the columns, and each one of these arrays is broken down into a sub array with another 3 elements, dependent on the number of rows, in total there are 6 different arrays with a total of 9 elemtns
      let cellX = i * cellSize;     // these two sections refer to the earlier made arrays to define cells on the x-axis (using "i") and cells on the y-axis (using "j")
      let cellY = j * cellSize;
      stroke(0);     // cells got no stroke
      if (grid[i * cols + j]) {     //this section evaluates the state of the cells fronm the random grid function, "i" representes the columns, and "j" checks each element in the sub-array. so basicly itschecking each element in each row array, moving across the colum arrays. If the element is true then it is filled in, if false then it is made empty
        square(cellX, cellY, cellSize);     // using the earlier defined peramiters "square" cells are made, square(x-position, y-position, size)
      }
    }
  }
}

function mousePressed() {     // because the grid is not a bunch of objects, instead it is an array of cells, you cant tell the program to toggles the clicked squre, you need to see where the curser is relative to the set of arrays, if you know where it is, you can then calculate what cell it would be in allowing you to toggle it 
  let i = floor(mouseX / cellSize);     // by dividing mouse x or y by the row or colmn respectivly you can identify the cell: ex. in a 4x4 on a 400 px canvas and a cell sive of 100, at mouseX 200 you would (200/100=2) indecating row 2, at mouseY of 100 you would do the same (100/100=1) indecating the first cell of the second row
  let j = floor(mouseY / cellSize);     
  if (i >= 0 && i < width && j >= 0 && j < height) {     // this section indecates for a cell to change the curser needs to be within the grid, defined by width and height
 grid[i * cols + j] = !grid[i * cols + j];     // this part of the code checks to see if the cell is on or off, it does so by calculating the position of the mouse, done in the previouse section, rounding it out (using 'floor') and refering back to create grid array to see if true or false. the code then says turn the current state of the cell from what it is to whatever the inverse of it is
  }
}

function randomGrid(cols, rows) {     // this function creates a random grid that is run at the start of the program and when the grid is expanded
  newGrid = new Array(cols * rows);     // a new array that has the same amount of elements as the size of the grid
  for (let i = 0; i < cols * rows; i++) {     // create a loop that is as large as the grid
    newGrid[i] = random() > 0.5;     // the "newArray"(which is an array the same size as the grid) is give the value of "i" (which is another array the same size as the grid), this newArray is then euqal to a random number that is less than 0.5. What this essentually means that less then hal of the array wiill be true, i.e off. this allows us to contrull how many elements in the grid will be on or off
  }
  return newGrid;     // this allows the array inside this function to be refered ot outside of the function
}

function startTimer() {     // set timer to limit how long the user can see the pattern
  timer = setTimeout( function() { // use an anonymouse function so that a the set time function doesnt need to refer to a different, predetermined function, because this function is only used once in the code (dont need it later)
    resetGrid();       // once the timer is done run the reset grid function
  },2 * cols * 1000);     // the timer is dependent on the size of the grid, the timer is 2 times more seconds then the sice of the grid
}

function stopTimer() {
  clearTimeout(timer);  //clear the timer after it is done so that it doesnt restart
}

function resetGrid() {     // reset the grid so that the user can match the pattern, this whole function just looks at column arrays and all the sub row arrays and says to set each one to true, which fills them in
for (let i = 0; i < cols; i++) {     
    for (let j = 0; j < rows; j++) {
      grid[i * cols + j] = true; // set em all to true
    }
  }
}

function mouseReleased() { // does the user made pattern match the previously made pattern, we use a mouse release function so that we dont confure the program with the previouse "mousePressed" function that toggles cell states
  for (let i = 0; i < cols * rows; i++) {     // this part of the code essentially breaks down each call into its own part, because the array's values are either true or fals, this allows the program to tell what the pattern looks like (like wht it is, not looks like cause it dont got eyes)
    if (grid[i] !== initialPattern[i]) {   // this part checks to see if the curebt pattern, the one made by the user, is equal to the previously saved slice
      return;     // this return function doesnt really return to anywhere, it just leaves the function and  runs it again, this allows the function to chack over and over again whether or not the new grid matches the original pattern
    }
  }

  if (cols < 10 && rows < 10) { // if the user pattern mathes the original pattern increase the rows & colmns by 1 each, adjust cell size, make a new random pattern, save that pattern for future refrence and start the timmer
    cols++;
    rows++;
    cellSize = width / cols;
    initialPattern = randomGrid(cols, rows);
    grid = initialPattern.slice();
    startTimer();
  }
}