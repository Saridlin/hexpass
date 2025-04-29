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
var mainLayout;

let path = [Hex(0,0,0)];
let posHex = Hex(0,0,0);


function setup(){
  canvas = createCanvas(600, 600);
  canvas.parent('canv-holder');
  background(0);
  angleMode(degrees);

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

  size = Point(30,30);
  originPixel = Point(width/2, height/2);
  mainLayout = hexLayout(pointyOrient, size, originPixel)
  hexGenerateBoard(boardRadius, hexes, Hex(0,0,0));
  originHex = Hex(0,0,0);
}

function draw(){
  stroke(0);
  strokeWeight(1);
  fill(255);


  push();
  translate(width/2, height/2);
  
  hexDrawArray(mainLayout, hexes);

  fill(255, 0, 0);
  hexDrawArray(mainLayout, path);

  for(let i = 0; i < chars.length; i++){
    let currHex = hexes[i];
    let pt = hex2Screen(mainLayout, currHex);
    let cx = pt.x;
    let cy = pt.y;
    
    stroke(0);
    fill(0);
    text(charTiles[i], cx-3, cy+3);
  }
  pop();
  if(keyIsPressed){
    checkMove();
  }
  console.log(path[path.length-1]);
  fill(200, 0, 0);
}


// function hexDrawArray(layout, hexes, color) {
//   for (var i = 0; i < hexes.length; i++) {
//     fill(color);
//     hexDraw(layout, hexes[i]);
//   }
// }

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
      path.push(hexGetNeighbor(posHex, 5));
      posHex = path[path.length-1];
      console.log("w - moved");
      break;
    case 'e':
      //top right - dir 0
      path.push(hexGetNeighbor(posHex, 0));
      posHex = path[path.length-1];
      console.log("e - moved");
      break;
    case 'a':
      //left - dir 4
      path.push(hexGetNeighbor(posHex, 4));
      posHex = path[path.length-1];
      console.log("a - moved");
      break;
     case 'd':
      //right - dir 1
      path.push(hexGetNeighbor(posHex, 1));
      posHex = path[path.length-1];
      console.log("d - moved");
      break;
    case 'z':
      //bott left - dir 3
      path.push(hexGetNeighbor(posHex, 3));
      posHex = path[path.length-1];
      console.log("z - moved");
      break;
    case 'x':
      //bott right - dir 2
      path.push(hexGetNeighbor(posHex, 2));
      posHex = path[path.length-1];
      console.log("x - moved");
      break;
    default:
      console.log("no move");
      break;
  }
  key = '';
}



