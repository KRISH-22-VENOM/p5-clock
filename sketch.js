// Declare variables for shape radii
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;

function setup() {
  createCanvas(710, 400);
  stroke(255);
  angleMode(DEGREES);

  // Set radius for each shape based on canvas dimensions
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;
}

function draw() {
  background(230);

  // Move origin to center of canvas
  translate(width / 2, height / 2);

  // Draw the clock background
  noStroke();
  fill(44, 22, 58);
  ellipse(0, 0, clockDiameter + 25, clockDiameter + 25);
  fill(137, 34, 193);
  ellipse(0, 0, clockDiameter, clockDiameter);

  // Calculate angles for each hand
  let s = map(second() + millis() / 1000, 0, 60, 0, 360); // Smooth seconds
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, 360);
  let h = map(hour() % 12 + norm(minute(), 0, 60), 0, 12, 0, 360);

  stroke(255);

  // Second hand
  push();
  rotate(s);
  strokeWeight(1);
  line(0, 0, 0, -secondsRadius);
  pop();

  // Minute hand
  push();
  rotate(m);
  strokeWeight(2);
  line(0, 0, 0, -minutesRadius);
  pop();

  // Hour hand
  push();
  rotate(h);
  strokeWeight(4);
  line(0, 0, 0, -hoursRadius);
  pop();

  // Tick markers around perimeter of clock
  push();
  strokeWeight(2);
  for (let ticks = 0; ticks < 60; ticks += 1) {
    point(0, -secondsRadius);
    rotate(6);
  }
  pop();

  // Add numbers to the clock face
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(1000);
  for (let num = 1; num <= 12; num++) {
    let angle = map(num, 0, 12, 0, 360);
    let x = cos(angle - 90) * hoursRadius * 1.59;
    let y = sin(angle - 90) * hoursRadius * 1.59;
    text(num, x, y);
  }

  // Central pivot decoration
  fill(400);
  ellipse(0, 0, 10, 10);
}
