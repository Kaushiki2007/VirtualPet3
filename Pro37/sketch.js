  var database;
  var foodS, foodStock, foodObject;
  var dog, happyDog, sadDog;
  var feedTime, lastFed;
  var feed, addFood;
  var gameState = "Hungry";
  function preload()
  {
    happyDog = loadImage("images/dogImg1.png");
    sadDog = loadImage("images/dogImg.png");
  
  }

  function setup() {
    createCanvas(1000, 400);
    //Database = firebase.database();
    foodObject = new Food();
    dog = createSprite(800,200,150,150);
    dog.addImage(sadDog);

    feed = createButton("Feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    readState = database.ref('gameState');
    readState.on("value",function(data){
    gameState = data.val();  
    });
  }


  function draw() {  
    background(46, 139, 87);

    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed :" +lastFed%12 + "PM", 350,30);
    }
    else if(lastFed == 0);
    { 
      text("Last Feed : 12 AM", 350,30);
    }
    currentTime = hour();
    if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    } else if(currentTime==(lastFed+2)){
      update("Sleeping");
      foodObj.bedroom();
    }
    else{
      update("Hungry");
      foodObj.display();
    }

    drawSprites();
  }

  function addFoods(){
    foodS++;
        database.ref('/').update({
        Food:foodS
        })
    }
    

  function feedDog(){
    dog.addImage(happyDog);
    foodObject.updatefoodStock(foodObject.getfoodStock()-1);
    database.ref('/').update({
      Food:foodObject.getfoodStock(),
      feedTime:hour()
    })
  }

  function update(state){
    database.ref('/').update({
      gameState:state
    });
  }

  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
  } else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }

