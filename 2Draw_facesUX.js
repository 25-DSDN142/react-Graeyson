// ----=  Faces  =----

let accessories = [];
let currentAccessory = 0;
let wasMouthOpen = false;
let isMouthOpen = false;



/* load images here */
function prepareInteraction() {

  accessories.push(loadImage('BlackGlasses.png'));
  accessories.push(loadImage('BlueGlasses.png'));
  accessories.push(loadImage('PinkGlasses.png'));
  accessories.push(loadImage('EyePatch.png'));
  accessories.push(loadImage('Emote.png'));
  accessories.push(loadImage('demon.png'));
}

function drawInteraction(faces, hands) {

  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face\
    //  console.log(face);
    if (showKeypoints) {
      drawPoints(face)
    }

    checkIfMouthOpen(face);

    if (isMouthOpen && !wasMouthOpen) {
      currentAccessory = (currentAccessory + 1) % accessories.length;
      clear();
    }

    wasMouthOpen = isMouthOpen;

    /*
    Start drawing on the face here
    */


    //camera background details

    let faceCenterX = face.faceOval.centerX;
    let faceCenterY = face.faceOval.centerY;
    let faceWidth = face.faceOval.width;
    let faceheight = face.faceOval.height;

    let accessoryW = faceWidth * 1.5;
    let accessoryH = faceheight;


    image(
      accessories[currentAccessory],
      faceCenterX - accessoryW / 2,
      faceCenterY - accessoryH / 1.5,
      accessoryW,
      accessoryH
    );

    noStroke();

    fill(255);
    textSize(24);
    text("Open mouth to change filter!");

    fill('lightgrey');
    rect(0, 0, 800, 70);
    rect(0, 870, 800, 69)
    ellipse(400, 800, 90, 90);
    fill('darkgrey');
    ellipse(400, 800, 60, 60);



    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}


function checkIfMouthOpen(face) {

  let upperLip = face.keypoints[13]
  let lowerLip = face.keypoints[14]
  // ellipse(lowerLip.x,lowerLip.y,20)
  // ellipse(upperLip.x,upperLip.y,20)

  let d = dist(upperLip.x, upperLip.y, lowerLip.x, lowerLip.y);
  //console.log(d)
  if (d < 13) {
    isMouthOpen = false;
  } else {
    isMouthOpen = true;
  }

}

function drawX(X, Y) {
  push()

  strokeWeight(15)
  line(X - 20, Y - 20, X + 20, Y + 20)
  line(X - 20, Y + 20, X + 20, Y - 20)

  pop()
}


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()


}