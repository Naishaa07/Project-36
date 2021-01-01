//Create variables here
var dog, happyDog, database, foodS, foodStock, dog1, dog2, button1, button2;
var foodObj, hour, fedTime;
function preload()
{
  dog2=loadImage("images/dogImg.png")
  dog1=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  dog=createSprite(250,250,5,5)
  dog.scale=0.2
  dog.addImage(dog1)
  foodStock=database.ref("Food")
  foodStock.on("value",readStock)
  foodObj=new food();
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
}


function draw() {  
  background(46,139,87)
 /* if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dog2)
  }*/
  button1=createButton("Feed")
  button2=createButton("Add Food")
  button1.position(500,100)
  button2.position(600,100)
  button1.mousePressed(feedDog)
  button2.mousePressed(addFood)
  drawSprites();
  textSize(15)
  fill("white")
  text("Food Remaining : " + foodS,180,150)
  //text("Note:Press UP_ARROW key to feed milk", 100,16)
  //add styles here
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x>0){
  x=x-1
  }
  database.ref('/').update({Food:x})
foodObj.display();
}

  async function getTime(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata")
    var  abc=await response.json()
    var qwer=abc.datetime
    hour= qwer.slice(11,13)
}
function feedDog(){
  dog.addImage(dog2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:getTime()
  })
}
function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
