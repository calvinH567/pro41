var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score =0;
var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitGroup;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;
var player1score =0;
var player2score =0;
var playerControls = 0;
var gameStateRef;
var frameCounting
var randAn;
var randX
var playerOneScore,playerTwoScore;
function preload(){
  back_img = loadImage("jungle.jpg");
  player_img = loadImage("basket2.png");
  fruit1_img = loadImage("apple2.png");
  fruit2_img = loadImage("banana2.png");
  fruit3_img = loadImage("melon2.png");
  fruit4_img = loadImage("orange2.png");
  fruit5_img = loadImage("pineapple2.png");
  fruitGroup = new Group();
}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  gameStateRef = database.ref("gameState");
  gameStateRef.on("value",function(data){
    gameState = data.val();
 });
}

function draw() {
  frameCounting = frameCounting + 1;
  if(frameCounting>30){
    frameCounting = 0;
    var fruit = createSprite(Math.round(random(0,windowWidth)));
    fruit.addAnimation("fruits",fruit1_img);
    fruitGroup.add(fruit);
    fruitGroup.setVelocityYEach(5)
  }
  console.log(player.name)
  background(back_img);
  if (player.index !== null){
    for (var i = 0; i <fruitGroup.length; i ++){
      if(fruitGroup.get(i).isTouching(players)){
        fruitGroup.get(i).destroy();
        player.score = player.score +1;
        player.update();
        p1GetScore(score);
      }
    }
  }

  // Add conditions for gameStates and playerCount
  if(playerCount ==2){
    gamestateUpdate(1);
    console.log("player 2")
  }
  console.log("dasdasd")
  if(gameState==1){
    textSize (50)
    text("Player1:" + player1score,50,100);
  //text("Player2:" + allPlayers.player2.score,50,200);

    game.play();
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10;
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10;
      player.update();
    }
  }
  if(keyDown(LEFT_ARROW)){
    player + player.index
  }

  if(frameCount%100==0){
    randX = Math.round(random(0,windowWidth));
    fruit = createSprite(randX,350,20,20); 
  randAn = Math.round(random(1,2));
  switch(randAn){
    case 1:
      
      fruit.addAnimation("fruit1",fruit1_img);
      break;
    case 2:
      
      fruit.addAnimation("fruit2",fruit2_img);
      break;
    case 3:
      
      fruit.addAnimation("fruit3",fruit3_img);
      break;
    case 4:
      
      fruit.addAnimation("fruit4",fruit4_img);
      break;
  }
  fruit.velocityY = 5
  fruitGroup.add(fruit)
  }
  
 
  }

function gamestateUpdate(data){
  database.ref("/").update({
    gameState: data
  })
}

function p1GetScore(data){
  var player1 = database.ref('players/player1');
  player1.on("value", (data) => {
       playerOneScore=data.val();
  })
}
