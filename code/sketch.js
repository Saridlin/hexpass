let canvas;

let spec = [33, 35, 36, 42, 46, 45, 63, 94, 95]; //special characters KeyCode
let chars = []; //char list
let charTiles = []; //char list, but for randomizing
let cNum = 91; // even, 5 radius hexgrid

//hexgrid setup
var boardRadius = 5;
var size;
var originHex;
var hexes = [];
var hexChar = [];
var mainLayout;

let path = [];
let posHex;
let pass = [];


function setup(){
  canvas = createCanvas(600, 600);
  canvas.parent('canv-holder'); //setting DOM parent for p5canvas
  background(0);
  angleMode(degrees);

  //setting up character list
  for(let i = 0; i < 26; i++){
    //0-25 = A-Z
    chars[i] = String.fromCharCode(65+i);
    //26-51 = a-z
    chars[i+26] = String.fromCharCode(97+i);
  }
  for(let i = 0; i < 10; i++){
    //52-81 = 0-9 thrice
    chars[i+52] = String.fromCharCode(48+i);
    chars[i+62] = String.fromCharCode(48+i);
    chars[i+72] = String.fromCharCode(48+i);
  }
  for(let i = 0; i < 9; i++){
    //82-91 = special characters
    chars[i+82] = String.fromCharCode(spec[i]);
  }

  //duplicating chars over to shuffled array
  for(let i = 0; i < chars.length; i++){
    charTiles[i] = chars[i];
  }
  shuffleArray(charTiles);

  //setting up main hexgrid - copied from tutorial code
  size = Point(30,30);
  originPixel = Point(width/2, height/2);
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);

  //setting start to movement grid
  posHex = Hex(0,0,0);
  path = [Hex(0,0,0)];
}

function draw(){
  stroke(255, 0, 0);
  point(30,30);
  stroke(0);
  strokeWeight(1);
  fill(255);

  push();
  translate(width/2, height/2);
  
  //drawing main grid
  hexDrawArray(mainLayout, hexes);

  //drawing path
  fill(120, 0, 0);
  hexDrawArray(mainLayout, path);

  //drawing current position
  fill(255, 0, 0)
  hexDraw(mainLayout, path[path.length-1]);

  //drawing characters onto tiles
  for(let i = 0; i < chars.length; i++){
    let currHex = hexes[i];
    let pt = hex2Screen(mainLayout, currHex);
    let cx = pt.x;
    let cy = pt.y;
    
    hexChar[i] = [hexes[i], charTiles[i]];

    stroke(0);
    fill(0);
    text(charTiles[i], cx-3, cy+3);
  }
  pop();

  //movement
  if(keyIsPressed){
    checkMove();
  }
}

//copied from stackoverflow
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function checkMove(){
  switch(key){
    case 'w':
      //top left - dir 5
      checkGrid(5);
      break;
    case 'e':
      //top right - dir 0
      checkGrid(0);
      break;
    case 'a':
      //left - dir 4
      checkGrid(4);
      break;
     case 'd':
      //right - dir 1
      checkGrid(1);
      break;
    case 'z':
      //bott left - dir 3
      checkGrid(3);
      break;
    case 'x':
      //bott right - dir 2
      checkGrid(2);
      break;
    case 'p':
      fetchPass();
      let n = "";
      for (let i = 0; i < pass.length; i++){
        n = n + pass[i];
      }
      console.log(n);
      break;
    default:
      console.log("no move");
      break;
  }
  key = '';
}

function checkGrid(dir){
  //checking if next position would fall on grid
  let temp = getHex(hexes, hexGetNeighbor(posHex, dir), 5);
  console.log(temp);

  //checking if next tile exisitng in path already
  let temp2 = false;
  for (let i = 0; i < path.length; i++){
    if (temp === path[i]){
      temp2 = true;
    }
  }

  //move if all checks passed successfully
  if (temp != null && temp2 == false){
    path.push(temp);
    posHex = path[path.length-1];
  } else {
    console.log("no move");
  }
}

//printing out collected password
function fetchPass(){
  for(let j = 0; j < path.length; j++){
    for (let i = 0; i < cNum; i++){
      if(hexIsEquals(path[j], hexChar[i][0])){
        pass.push(hexChar[i][1]);
      }
    }
  }
}



