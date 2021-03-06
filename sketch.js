var ball;
var ball1;
var position;
var database;

function setup(){
    createCanvas(500,500);
    //connecting the databse with the program
    database = firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    //referring to the database to read the value
    var ball1Position = database.ref("ball/position")
    //reading the value from the database
    ball1Position.on("value", readPosition , showError)
   
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

// function to write the x and y position into the database
function writePosition(x,y){
    //updating the x and y position in the database
    database.ref("ball/position").set({
    'x': position.x + x, 
    'y': position.y + y
    })


}

//function for reading the position of the ball from the database
function readPosition(data){
    //storing the data value from the database into the position variable
position = data.val();
//assigning the ball sprite with the position from the database
ball.x = position.x
ball.y = position.y
}

//function for showing the error
function showError() {
    console.log("error in writing data to the database")
}

