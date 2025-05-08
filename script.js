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
  UpdatePrices();
  UpdateGUI();

  potricule_timer += delta*game.potricule_speed;

  if (Date.now()-game.last_tick>= 1000){ // оффлайн прогресс 
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


function UpdatePrices(){
  potricule_price = 5*game.potricule; //цены потрикул
  if (game.potricule >= 10){
    potricule_price = 10*game.potricule;
  }
  if (game.potricule >= 100){
    potricule_price = (10**(Math.log10(game.potricule).toFixed(0)))*game.potricule;
  }

  potricule_speed_price = (game.potricule_speed*2)**3; //цены ускорений
}

function UpdateGUI(){
  BipkiL.textContent= "You have " + NumberNotation(game.bipki)+ " Bipki";
  BipkiIncreaseL.textContent= NumberNotation(game.potricule*0.1*game.potricule_speed) + " B/S";

  PotriculeButton.textContent = NumberNotation(potricule_price);
  if (game.bipki >= potricule_price){
    PotriculeButton.style.color = "green";
  }
  else{
    PotriculeButton.style.color = "red";
  }

  PotriculeSpeedButton.textContent = NumberNotation(potricule_speed_price);
  if (game.bipki >= potricule_speed_price){
    PotriculeSpeedButton.style.color = "green";
  }
  else{
    PotriculeSpeedButton.style.color = "red";
  }
}

function BuyPotricule(){
 if (game.bipki >= potricule_price){
  game.bipki-=potricule_price;
  game.potricule+=1;
  UpdatePrices();
 }
}

function NumberNotation(number){
  if (number < 1e+3){
    return number.toFixed(1)
  }
  if (number < 1e+6){
    return ((number*1e-3).toFixed(2)).toString()+"k";
  }
  if (number < 1e+9){
    return ((number*1e-6).toFixed(2)).toString()+"M";
  }
  if (number < 1e+12){
    return ((number*1e-9).toFixed(2)).toString()+"B";
  }
  if (number < 1e+15){
    return ((number*1e-12).toFixed(2)).toString()+"Qa";
  }
  if (number < 1e+18){
    return ((number*1e-15).toFixed(2)).toString()+"Qt";
  }
  if (number < 1e+21){
    return ((number*1e-18).toFixed(2)).toString()+"Sx";
  }
  if (number < 1e+24){
    return ((number*1e-21).toFixed(2)).toString()+"Sp";
  }
  if (number < 1e+27){
    return ((number*1e-24).toFixed(2)).toString()+"Oc";
  }
  if (number < 1e+30){
    return ((number*1e-27).toFixed(2)).toString()+"No";
  }
  if (number < 1e+33){
    return ((number*1e-30).toFixed(2)).toString()+"Dec";
  }
};

function BuyPotriculeSpeed(){
 if (game.bipki >= potricule_speed_price){
  game.bipki-=potricule_speed_price;
  game.potricule_speed*=2;
  UpdatePrices();
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
 LoadGame();
 UpdatePrices();
}



setInterval(Main, 16);
