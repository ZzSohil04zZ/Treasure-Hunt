var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY = 1
var END = 0 
var gamestate = PLAY

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  
  createCanvas(windowHeight,windowWidth);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("endgame",endImg)
boy.scale=0.08;
  
endG = createSprite(width/2,height/2)
endG.addImage(endImg)
endG.scale = 0.8
endG.visible = false
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(gamestate === PLAY){
    
     if(path.y > height ){
    path.y = height/2;
  }
     boy.x = World.mouseX;
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    // rewarding system
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection  + 100
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection  = treasureCollection + 200
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 300 
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gamestate = END
    }
  }
    
  }
  
  else if (gamestate === END){
    //destroy them
    path.velocityY = 0
    cashG.destroyEach();
    cashG.setVelocityYEach = 0
    diamondsG.destroyEach();
    diamondsG.setVelocityYEach = 0
    jwelleryG.destroyEach();
    jwelleryG.setVelocityYEach = 0
    swordGroup.destroyEach();
    swordGroup.setVelocityYEach = 0
    endG.visible = true
    boy.destroy();
   
  }
  
  //code to reset the background
 

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,  width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  //cash.lifetime = 190;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  //diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,  width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  //jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,  width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
 // sword.lifetime = 150;
  swordGroup.add(sword);
  }
}