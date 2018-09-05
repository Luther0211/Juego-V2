//Canvas config
var canvas = document.getElementsByTagName('canvas')[0];
ctx = canvas.getContext('2d');


//Variables globales
var meteors = []
var images  = {
    bg: "https://i.imgur.com/k0bwZ5C.jpg",
    planet1:"https://i.imgur.com/XC0l2s5.png",
    planet2:"https://i.imgur.com/7CE0aiK.png",
    planet3:"https://i.imgur.com/usrB8Sj.png",
    P1: "https://i.imgur.com/lDNOf2n.png",
    P2: "https://i.imgur.com/doHy8wW.png",
    meteor1:"https://img9.androidappsapk.co/300/1/4/7/com.Oriol.Casa.png"
}
var frames





//clases

class Board{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.bg
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=0.4
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

} // clase Board

class Planet1{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet1
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=0.8
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}

class Planet2{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet2
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=1.2
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}

class Planet3{
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = document.createElement('img')
        this.image.src = images.planet3
        this.image.onload = () => {
            this.draw()
        }
    }
draw(){
  //velocidad del fondo
this.y+=1.9
if(this.y > this.height ) this.y = 0
  //primer fondo
ctx.drawImage(this.image,this.x,this.y,this.width,this.height)    
  //segundo fondo
 ctx.drawImage(this.image,this.x,this.y - this.height,this.width,this.height)      

}

}

class P1{
    constructor(){
        this.x = 250
        this.y = 735
        this.width = 34
        this.height = 60
        this.image = document.createElement('img')
        this.image.src = images.P1
        this.image.onload = () => {
             this.draw()
        }
        this.gravity = -5
        
    }

    draw(){
        if(this.y < canvas.height - 60) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 
       
}



class P2{
    constructor(){
        this.x = 650
        this.y = 735
        this.width = 34
        this.height = 60
        this.image = document.createElement('img')
        this.image.src = images.P2
        this.image.onload = () => {
             this.draw()
        }
        this.gravity = -5
        
    }

    draw(){
        if(this.y < canvas.height - 60) this.y += this.gravity
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    } 
       
}


class Meteors{
  constructor(x){
    this.x = x
    this.y = 740
    this.width = 100
    this.height = 100
    this.image = document.createElement('img')
    this.image.src = images.meteor1
    this.image.onload = () => {
      this.draw()
    }
    this.gravity = -2
  }
  
  draw(){
    this.y-=2
    if(this.y < canvas.height - 60) this.y += this.gravity
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
  checkCollition(player1){
            return  (this.x < player1.x + player1.width) &&
                    (this.x + this.width > player1.x) &&
                    (this.y < player1.y + player1.height) &&
                    (this.y + this.height > player1.y);
        }
}



//instancias
var board = new Board()
var planet1 = new Planet1()
var planet2 = new Planet2()
var planet3 = new Planet3()
var player1 = new P1()
var player2 = new P2()



//funciones principales


function update(){
  frames++
  console.log(meteors.length)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    board.draw()
    planet1.draw()
    planet2.draw()
    planet3.draw()
    player1.draw()
    player2.draw()
    //meteoros
    generateMeteors()
    drawMeteors()
    checkTopLimitP1()
    checkTopLimitP2()
    checkMeteorsCollitions()
    checkMeteorsCollitions2()
}


function start(){
   //if(interval) return
    meteoros = []
    frames = 0
    interval = setInterval(update, 1000/60)
}


function gameOver1(){
    clearInterval(interval)
    ctx.font = "80px Avenir"
    ctx.fillStyle = "green"
    ctx.fillText("Player Green Wins!", 50,250)
    ctx.font = "50px Avenir"
    ctx.fillStyle = "yellow"
    ctx.fillText("Press 'Enter' to restart", 50,300)
    interval = null
    board.music.pause()
}

function gameOver2(){
    clearInterval(interval)
    ctx.font = "80px Avenir"
    ctx.fillStyle = "red"
    ctx.fillText("Player Red Wins!", 50,250)
    ctx.font = "50px Avenir"
    ctx.fillStyle = "yellow"
    ctx.fillText("Press 'Enter' to restart", 50,300)
    interval = null
    board.music.pause()
}


//funciones auxiliares
function generateMeteors(){
   if(frames % 20 === 0){
    var x = Math.floor(Math.random()*(canvas.width-100))
    var M1 = new Meteors(x)
    meteors.push(M1)
   }
}

function drawMeteors(){
  meteors.forEach(function(Meteors){
    Meteors.draw()
  })
}


function checkMeteorsCollitions(){
        meteors.forEach(function(Meteors){
            if(Meteors.checkCollition(player1)){
                console.log("ouch!")
                player1.y -= 50

            }
        })
    }


function checkMeteorsCollitions2(){
        meteors.forEach(function(Meteors){
            if(Meteors.checkCollition(player2)){
                console.log("ouch!")
                player2.y -= 50

            }
        })
    }


function checkTopLimitP1(){
        if( player1.y <= -60 ){
            gameOver2()
        }  
}

function checkTopLimitP2(){
        if( player2.y <= -60 ){
            gameOver1()
        }  
}

//los observadores

//MOVE DOWN
    //Player 1
addEventListener('keydown', function(e){
   if(e.keyCode === 83 && player1.y < 680){
      player1.y += 50
   } 
     //Player 2
   if(e.keyCode === 75 && player2.y < 680){
     player2.y +=50
   }
   

//MOVE LEFT
      //Player 1
  if(e.keyCode === 65 && player1.x > 50 && player1.y < 680){
    player1.x -=40
    player1.y +=10
  }
     //Player 2
  if(e.keyCode === 74 && player2.x > 50 && player2.y < 680){
    player2.x -=40
    player2.y +=10
  }

  
  
  
//MOVE RIGHT
       //Player 1
  if(e.keyCode === 68 && player1.x < 930 && player1.y < 680){
    player1.x +=40
    player1.y +=10
  }
      //Player 2
  if(e.keyCode ===76 && player2.x < 930 && player2.y < 680){
    player2.x +=40
    player2.y +=10
  }
  
  

  
   if(e.key === "Enter"){
       start()
     
   }
  
  

})