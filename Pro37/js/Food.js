    class Food{
        constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        }

        bedroom = loadImage("images/virtual pet images/Bed Room.png")
        garden = loadImage("images/virtual pet images/Garden.png");
        washroom = loadImage("images/virtual pet images/Wash Room.png");
        livingroom = loadImage("images/virtual pet images/Living Room.png");

        getfoodStock(){
            var foodRef = database.ref('food');
            foodRef.on("value",(data)=>{
            this.foodStock = data.val();
            }) 
        }

        updatefoodStock(food){
            database.ref('/').update({  
                'food' : food
            });
        
        }

        display() {
            var x=80,y=100;
            imageMode(CENTER);
            image(this.image,720,220,70,70);

            if(this.foodStock!=0){
                for(var i=0; i<this.foodStock; i++){
                    if(i%10==0){
                        x = 80;
                        y = y+50;
                    }
                    image(this.image,x,y,50,50)
                    x = x+30
                }
            }
        }

    
        deductFoods(){
            if(this.foodStock>0){
                this.foodStock--;
            }
        }

        bedroom(){
            background(bedroom,550,500);
        }

        garden(){
            background(garden,550,500);
        }

        washroom(){
            background(washroom,550,500);
        }

        livingroom(){
            livingroom(washroom,550,500);
        }
    }