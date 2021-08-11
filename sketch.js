var garden,gardenImag;
var rabbit,rabbitImg;
var appleImg,leafImg,leafImg2,leafImg3;

var appleGroup;
var leafGroup;

var score = 0;

var gameSpeed = 0;

var itemSpeed = 0;

function preload(){
  gardenImg = loadImage("garden.png");
  rabbitImg = loadImage("rabbit.png");

  appleImg = loadImage("apple.png");

  leafImg = loadImage("leaf.png");
  leafImg2 = loadImage("orangeLeaf.png");
  leafImg3 = loadImage("redImage.png");

  appleGroup = createGroup();
  leafGroup = createGroup();

}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
garden=createSprite(200,200);
garden.addImage(gardenImg);

//creating boy running
rabbit = createSprite(180,340,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
}


function draw() {

  if(itemSpeed<10 && frameCount%75 === 0){
    itemSpeed+=0.5
  }

  background(0);
  
  if(frameCount % 75 === 0){
    gameSpeed+=0.33;
  }

  if(frameCount % Math.round(random(25-itemSpeed,75-itemSpeed*5))===0){
    if(random(1,10)>4.5-itemSpeed*1/4){
      spawnLeaves();
    }
    else{
      spawnApples();
    }
  }

  edges= createEdgeSprites();
  rabbit.collide(edges);

  if(mouseX>-10&&mouseX<420){
    rabbit.x = mouseX;
  }

  drawSprites();

  fill("white");
  text(score,25,25);

  if(frameCount%10 === 0){
    score++;
  }

  if(rabbit.isTouching(appleGroup)){
    if(frameCount%5 === 0){
      score+=10;
    }
  }

  if(rabbit.isTouching(leafGroup)){
    if(frameCount%5 === 0){
      score-=5;
    }
  }

  if(rabbit.isTouching(appleGroup)){
    if(score>999){
      fill("red");
      text("+10",65,25);
    }
    else if (score>99){
      fill("red");
      text("+10",57.5,25);
    }
    else{
      fill("red");
      text("+10",50,25);
    }
  }
  else if (rabbit.isTouching(leafGroup)){
    if(score>999){
      fill(rgb(100,175,125));
      text("-5",65,25);
    }
    else if (score>99){
      fill(rgb(100,175,125));
      text("-5",57.5,25);
    }
    else{
      fill(rgb(100,175,125));
      text("-5",50,25);
    }
  }

}

function spawnApples(){
  var apple = createSprite(random(20,380),-20,20,20);
  apple.addImage(appleImg);
  apple.velocityY = random(3.5+2/3*gameSpeed,4.5+gameSpeed);
  apple.scale = 0.1;
  rabbit.depth = apple.depth+1;
  appleGroup.add(apple);
}

function spawnLeaves(){
  var leaf = createSprite(random(20,380),-20,20,20);
  if(random(1,10)>6.66){
    leaf.addImage(leafImg3);
    leaf.velocityY = random(4+2/3*gameSpeed,5+4/3*gameSpeed);
  }
  
  else if(random(1,10)>5){
    leaf.addImage(leafImg);
    leaf.velocityY = random(2.5+1/2*gameSpeed,6.5+gameSpeed);
  }
  else{
    leaf.addImage(leafImg2);
    leaf.velocityY = random(3+1/2*gameSpeed,4.5+gameSpeed);
  }
  leaf.scale = 0.1;  
  rabbit.depth = leaf.depth+1;
  leafGroup.add(leaf);
}