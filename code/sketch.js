let canvas;

function setup(){
  canvas = createCanvas(500, 500);
  canvas.parent('canv-holder');
  background(0);
}

function draw(){
  stroke(255);
  strokeWeight(10);
  point(500, 0);
}