var size = 80;
var bubbles = [];
var score = 0;
var data;
let timer = 20;

function setup() {
  createCanvas(680, 1080);
  frameRate(15);
  textAlign(CENTER, CENTER);
  smooth();
  setInterval(countDown, 1000);
  var submit = select("#submit-container");
  submit.hide();
  var rank = select("#rank-container");
  rank.position(width * 0.5 - 0.5 * rank.width + 200, height * 0.5);
  rank.hide();
  over = false;
  score = 0;
}

function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.size = random(50, 150);
  this.speed = 1;
  this.disappear = false;

  this.display = function() {
    ellipse(this.x, this.y, this.size, this.size);
  };

  this.update = function() {
    this.y = this.y - this.speed;
    this.x = this.x + int(random(-2, 2));
    this.speed = this.speed + 0.1;
    if (this.y < 0 || this.y > height) {
      var id = bubbles.indexOf(this);
      bubbles.splice(x, 1);
    }
  };

  this.click = function() {
    if (mousePressed) {
      var d = dist(mouseX, mouseY, this.x, this.y);
      if (d < this.size / 2) {
        this.disappear = true; //pop animation perhaps
        var id = bubbles.indexOf(this);
        bubbles.splice(id, 1);
        score = score + 10;
      }
    }
  };
}

function draw() {
  if (over) {
    background(160);
    fill(0);
    textSize(80);
    text("Game Over!", width * 0.5, height * 0.2);
    textSize(40);
    display = "Your Score is " + score;
    text(display, width * 0.5, height * 0.3);
    var intt = selectAll(".input");
    var scoree = select(".score");
    scoree.value(score);
    var formm = select("#submit-container");
    formm.position(width * 0.5 - 0.5 * formm.width + 5, height * 0.5);
    formm.show();
  } else {
    background(0);
    fill('white');
    textSize(20);
    display = "Timer:" + timer + " s";
    text(display, width * 0.9, height * 0.05);
    var count = int(random(-30, 3));
    for (var i = 0; i < max(0, count); ++i) {
      var b = new Bubble(int(random(0, width)), height + 100);
      bubbles.push(b);
    }
    for (var i = 0; i < bubbles.length; i++) {
      bubbles[i].display();
      bubbles[i].update();
    }
  }
}

function mousePressed() {
  // Check if mouse is inside the circle
  for (var i = 0; i < bubbles.length; ++i) {
    bubbles[i].click();
  }
}

function countDown(){
  if (timer > 0){
    timer --;
  }
  if (timer == 0){
    over = true;
  }
}


