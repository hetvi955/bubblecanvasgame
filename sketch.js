let bubbles = [];
var score=0;

var paused=true;
var score = 0;
var highscore = localStorage.getItem("highscore");

if(highscore !== null){
    if (score > highscore) {
        localStorage.setItem("highscore", score);      
    }
}
else{
    localStorage.setItem("highscore", score);
}
highscore = +localStorage.getItem("highscore");


function setup() {
  createCanvas(1200,700);
  
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
        
  }
}
function touchEnded(){
   if (mouseX< 70 && mouseY<100){
    if (paused===false){
      paused=true;
    }
    else
    if (paused===true){
        paused=false;
      }
    }
   }
  
  function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
      score++;
      document.getElementById('sound').play();
      document.getElementById('score').innerHTML='SCORE:'+ score;
      
      

      if (score==(bubbles.length-1)){
        alert('you win!');
        document.location.reload();
        clearInterval(interval);
      }
    }
  }
}

function draw() {
  background(0);
  document.getElementById('highscore').innerHTML="HIGHSCORE:"+highscore;  

  if (paused===true){

  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    } else {
      bubbles[i].changeColor(0);
    }
    
    bubbles[i].move();
    bubbles[i].show();
   }
}
}
class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
    this.color='rgb('+ Math.floor(Math.random()*200)+','+ Math.floor(Math.random()*200) + ',' +  Math.floor(Math.random()*200) + ')';
    this.direction=Math.random()*Math.PI*2;
    this.speed=Math.random()*5;
    this.acc=random(1,2);
    
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

 move() {
    
    this.x+=Math.cos(this.direction)*this.speed*this.acc;
    this.y+=Math.sin(this.direction)*this.speed*this.acc;
  

    //to make the ball bounce back after hitting the walls//
    if (this.x - this.r <0){
      this.x = 0 + this.r;
      //to make it bounce back from the left wall, change the x (cos value) to -x // 
      this.direction = Math.atan2(Math.cos(this.direction)* -1 , Math.sin(this.direction));
  }
//same for the other 3 walls//
   else if (this.x + this.r>width){
       this.x = width - this.r;
       this.direction = Math.atan2(Math.cos(this.direction)* -1 , Math.sin(this.direction));

  }else if (this.y + this.r >height){
      this.y = height - this.r;
      this.direction = Math.atan2(Math.cos(this.direction) , Math.sin(this.direction)*-1);
 }else if (this.y - this.r <0){
  this.y = 0 + this.r;
  this.direction = Math.atan2(Math.cos(this.direction) , Math.sin(this.direction)*-1);
}
}
show() {
    stroke(255);
    strokeWeight(4);
    fill(this.color);
    ellipse(this.x, this.y, this.r * 2);
  }
}
function gameover(){
  for (let i = 0; i < bubbles.length; i++) {
  area=(bubbles[i] * Math.PI* (this.radius)^2);
  if (area===(0.75 * 1200*700)){
    alert('you lost!');
    clearInterval(interval);
  }
}
}
setInterval(gameover,10000);




