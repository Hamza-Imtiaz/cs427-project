//Creating stings of piano notes
var notes = [59, 60, 62, 64, 65, 67, 69, 71, 74];

//setting up the page where i create the canvas and piano keys
function setup() {
    createCanvas(500, 400);

    var div0 = createDiv("G5")
    div0.position(16, 250);
    var div1 = createDiv("G#5")
    div1.position(66, 250);
    var div2 = createDiv("A#5")
    div2.position(123, 250);
    var div3 = createDiv("C6")
    div3.position(183, 250);
    var div4 = createDiv("C#6")
    div4.position(234, 250);
    var div5 = createDiv("D#6")
    div5.position(290, 250);
    var div6 = createDiv("F6")
    div6.position(350, 250);
    var div7 = createDiv("G6")
    div7.position(405, 250);
    var div8 = createDiv("A#6")
    div8.position(456, 250);

    // Square oscillator
    osc = new p5.Oscillator('square');

    // Start the piano silently
    osc.start();
    osc.amp(0);

    // Createing drop down menu for differnt sound effects
    sel = createSelect();
    sel.position(5, 115);
    sel.option('square');
    sel.option('triangle');
    sel.option('sine');
    sel.selected('square');
    sel.changed(mySelectEvent);

    //Fuction to play selected drop down menu option
    function mySelectEvent() {
        let val = sel.value();
        if (val == 'square') {
            bgCol = new p5.Oscillator('square');
        } else if (val == 'triangle') {
            bgCol = new p5.Oscillator('triangle');
        } else if (val == 'sine') {
            bgCol = new p5.Oscillator('sine');
        }
    }
}

//Function to play a piano notes
function playNote(note, duration) {
    osc.freq(midiToFreq(note));
    // Fading the tone
    osc.fade(0.5, 0.2);
    //Fading out the tone
    if (duration) {
        setTimeout(function() {
            osc.fade(0, 0.2);
        }, duration - 50);
    }
}

//Function to draw the piano 
function draw() {
    // Draw a keyboard
    //Widht and leght of keys
    //keys can be increase if user want to all they have to do is add new note to note string on top and additional key will appear.
    var w = width / notes.length;
    for (var i = 0; i < notes.length; i++) {
        var x = i * w;
        // Checking if the mouse is over the key
        if (mouseX > x && mouseX < x + w && mouseY < height) {
            // Checking if user is clicking anf if it is change the key color
            if (mouseIsPressed) {
                fill(36, 126, 161);
                // Or if just hovering over use this color
            } else {
                fill(255, 215, 10);
            } // otherwise leave it to drfault 
        } else {
            fill(26, 146, 15);
        }
        //Setting up the key width and height
        rect(x, 30, w - 5, height - 198);
    }
}

//Function for mouse pressed 
function mousePressed() {
    // Map mouse to the key index
    var key = floor(map(mouseX, 0, width, 0, notes.length));
    playNote(notes[key]);
}
// Fading out the tone when user release the mouse
function mouseReleased() {
    osc.fade(0, 0.5);
}
