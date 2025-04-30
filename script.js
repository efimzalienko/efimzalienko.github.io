var BipkiL = document.querySelector('#TheNumber');

var BipkiIncreaseL = document.querySelector('#TheNumberIncrease');

var PotriculeButton= document.querySelector('#BuyPotricule');

var PotriculeSpeedButton = document.querySelector('#BuyPotriculeSpeed');


let game ={
 bipki: 0.0,
 potricule: 0,
 potricule_speed: 1,
 last_tick: Date.now()
}
let autosave_timer = 0;
let potricule_timer = 1;
const delta = 0.016;

let potricule_price = 5*game.potricule;
let potricule_speed_price = (game.potricule_speed*2)**3

function Main(){
  if (potricule_timer >= 1){
    if (game.potricule_speed >=64){
      game.bipki += game.potricule*0.1*game.potricule_speed*0.03125;
    }
    else{
      game.bipki += game.potricule*0.1;
    }
    potricule_timer = 0;
  }

  BipkiL.textContent= "You have " +game.bipki.toFixed(1).toString()+ " Bipki";
  BipkiIncreaseL.textContent= (game.potricule*0.1*game.potricule_speed).toFixed(1).toString() + " B/S";

  potricule_timer += delta*game.potricule_speed;
   
  if (game.bipki >= potricule_price){
    PotriculeButton.style.color = "green";
  }
  if (game.bipki >= potricule_speed_price){
    PotriculeSpeedButton.style.color = "green";
  }
  if (Date.now()-game.last_tick>= 2000){
    let diff = Date.now() -game.last_tick;
    game.last_tick = Date.now();
    while (diff > 0){
      diff -=16;
      Main();
    };
  }
  game.last_tick = Date.now();
  autosave_timer += delta;
  if (autosave_timer >= 10){
    SaveGame();
    autosave_timer = 0;
  }
};





function BuyPotricule(){
 if (game.bipki >= potricule_price){
  game.bipki-=potricule_price;
  game.potricule+=1;

  potricule_price = 5*game.potricule

  PotriculeButton.textContent = potricule_price.toFixed(0);
  if (game.bipki < potricule_price){
   PotriculeButton.style.color = "red";
  }
 }
}



function BuyPotriculeSpeed(){
 if (game.bipki >= potricule_speed_price){
  game.bipki-=potricule_speed_price;
  game.potricule_speed*=2;
  potricule_speed_price = (game.potricule_speed*2)**3 ;
  PotriculeSpeedButton.textContent = potricule_speed_price;
  if (game.bipki < potricule_speed_price){
   PotriculeSpeedButton.style.color = "red";
  }
 }
}

function SaveGame(){
 localStorage.setItem("bipkisave",JSON.stringify(game));
}
function LoadGame(){
 game = JSON.parse(localStorage.getItem("bipkisave"));
}

function EraseSave(){
 game ={
 bipki: 0.0,
 potricule: 0,
 potricule_speed: 1,
 last_tick: Date.now()
 };

 potricule_price = 5*game.potricule
 potricule_speed_price = (game.potricule_speed*2)**3;

 SaveGame();
}


if (localStorage.getItem("bipkisave")){
 LoadGame()
}



setInterval(Main, 16);
