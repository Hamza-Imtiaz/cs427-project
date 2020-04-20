//Global Variables
var angle = 0.0;
var button, button2;
var isPlaying = false;
var song;
var num = 0.10;
var counter = 0;
var Slider;
var x = 0;

//Preloading the audio file
function preload() {
  song = loadSound("Tone.mp3");
}

//Setting up the canvas/backgroud
function setup() {
  createCanvas(620, 400);
  noStroke();
  fill(100);
  rectMode(CENTER);

//Creating play and pause button
  button = createButton('Play');
  button.position(30, 140);
  button.size(90, 30);
  button.mousePressed(start);

//Creating Volume slider
  slider = createSlider(0, 100, 50);
  slider.position(30, 180);
}

//Drawing the background and the elements needed for this project
function draw() {
  background(51);
  translate(width / 2, height / 2);
  button.html('Play');
  angle += 0.30;
  
  //Writting volume by slider
  textSize(15);
  fill(255);
  text('Volume', -236, -101);

  //Calling function to change color when it's reach to certain point
  fill(toggleColor());
  
  //Spinning the shape
  rotate(angle);

  //checking if it's playing
  if (isPlaying == true) {
    button.html('Pause');
    rect(0, 0, 180, 180);

    //Setting up the values of slider
    let val = slider.value();
    if (val > 0)
      song.setVolume(0.25);
    else if (val > 25)
      song.setVolume(0.5);
    else if (val > 50)
      song.setVolume(0.75);
    else if (val > 75)
      song.setVolume(1.0);
    else
      song.setVolume(0.0);
  }
}

//Function to change the shape's color
function toggleColor() {
  let col = color(0, 255, 0);
  var delay = 500;
  if (x < delay * 2 + 1)
    x++;

  //Statement where it checkes if its a time to change the color
  if (x > 0 && x <= delay)
    col = color(0, 255, 0);
  else if (x > delay && x <= delay * 2)
    col = color(255, 255, 15);
  else if (x > delay * 2)
    col = color(255, 0, 0);
  return col;
}

//function to check if pressing the play button playing or not
//Also, checking if the song if palying or not
function start() {
  if (isPlaying == true) {
    isPlaying = false;
  } else if (isPlaying == false) {
    isPlaying = true;
  }
  
//Checking for dong
  if (!song.isPlaying()) {
    song.play();
  } else {
    song.pause();
  }
}
