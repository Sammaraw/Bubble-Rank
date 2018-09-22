var size = 80;
var bubbles = [];
var score = 0;

/*
colorMode(RGB,255);
smooth();
*/
function Bubble(x, y) {
  this.x = x;
  this.y = y;
  this.size = 150;
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

function setup() {
  createCanvas(680, 1080);
  frameRate(15);
  textAlign(CENTER,CENTER);
  smooth();
  var inn = select("#submit-container");
  inn.hide();
  over = true;
  score = 0;
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
    formm.position(width*.5-.5*formm.width+5,height*.5);
    formm.show();
  } else {
    background(0);
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
    console.log(bubbles.length);
    if (bubbles.length == 1){
      over = true;
    }
  }
}

/*
function rankresult(){
        //ajax call
         $.ajax({
                  url: 'https://necessary-rabbit.glitch.me/api/rank/new-user',
                  method:'POST',
                  data: {list: "some info"}
                }).done(function(data){
                    //if we have a successful post request ... 
                    if(data.success){
                        //change the DOM &
                        //set the data in local storage to persist upon page request
                        localStorage.setItem("permanentData", data.message);
                        var savedText = localStorage.getItem("permanentData");
                        $('li.change').replaceWith(savedText);

                        return;
                    }
                }).fail(function(){
                   //do nothing ....
                    console.log('failed...');
                    return;
                });
        };
*/