const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var score = 0;
var turns = 10;

var gameState = "play";

var ground;
var particle = [];
var plinko = [];
var division = [];

var divisionHeight = 300;

function setup() {
  createCanvas(650,700);

  engine = Engine.create();
  world = engine.world;

  b1 = new Division(645, 450, 10, 700);
  b2 = new Division(5, 450, 10, 700);
  b3 = new Division(325, 695, 650, 10);
  b4 = new Division(325, 5, 650, 10);

  for(var k = 0; k <= width; k = k+95){
    division.push(new Division(k, height - divisionHeight/2, 10, divisionHeight));
  }

  for(var l = 0; l <= width; l = l+70){
    plinko.push(new Plinko(l, 60, 15));
  }
  for(var l = 0; l <= width; l = l+50){
    plinko.push(new Plinko(l, 160, 15));
  }
  for(var l = 0; l <= width; l = l+87){
    plinko.push(new Plinko(l, 260, 15));
  }

  ground = new Ground(width/2,693,650,10);

  Engine.run(engine);
}

function draw() {
  if(gameState === "play"){

    background("black");
    
    textSize(35);
    fill(random(0,255,255), random(0,255,255), random(0,255,255));
    text("Score : "+ score, 20, 30);
    text("Turns : " + turns, 480, 30);
    text("500", 305, 420);
    text("200", 305 - 95, 420);
    text("200", 305 - (95*2), 420);
    text("200", 305 - (95*3), 420);
    text("100", 305 + (95*1), 420);
    text("100", 305 + (95*2), 420);
    text("100", 305 + (95*3), 420);

    ground.display();

    for(var k = 0; k < division.length; k++){
      division[k].display();
    }

    for(var l = 0; l < plinko.length; l++){
      plinko[l].display();
    }
    for(var l = 0; l < plinko.length; l++){
      plinko[l].display();
    }
    for(var l = 0; l < plinko.length; l++){
      plinko[l].display();
    }

    if(frameCount % 100 === 0){
      particle.push(new Particle(random(20, 630), 10, 10));
    }

    for(var j = 0; j < particle.length; j++){
      particle[j].display(); 

      if(particle[j].body.position.x < 286 && particle[j].body.position.y > 650){
        score = score + 200;
        turns -=1;
        particle.pop();
      }
    }

    for(var j = 0; j < particle.length; j++){
      if(particle[j].body.position.x > 286 && particle[j].body.position.x < 381 && particle[j].body.position.y > 650){
        score = score + 500;
        turns -=1;
        particle.pop();
      }
    }

    for(var j = 0; j < particle.length; j++){
      if(particle[j].body.position.x > 381 && particle[j].body.position.y > 650){
        score = score + 100;
        turns -=1;
        particle.pop();
      }

    }
  }

  if(turns === 0){
    gameState = "end";
  }

  if(gameState === "end"){
    background("yellow");
    textSize(35);
    fill(random(0,255,255), random(0,255,255), random(0,255,255));
    text("GAME OVER", 200, 200);
    text("Score : " + score, 220, 370);
    text("Press SPACE KEY to restart the game", 30, 450);
  }

  if(keyCode === 32 && gameState === "end"){
    reset();
  }
  
  drawSprites();
}

function reset(){
  gameState = "play";
  turns = 10;
  score = 0;
}