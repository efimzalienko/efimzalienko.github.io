var BipkiL = document.querySelector('#TheNumber');

var BipkiIncreaseL = document.querySelector('#TheNumberIncrease');

var PotriculeButton= document.querySelector('#BuyPotricule');

var PotriculeLabel = document.querySelector('#PotriculeLabel');
var PotriculeSpeedLabel = document.querySelector('#PotriculeSpeedLabel');

var ProgressLabel = document.querySelector('#ProgressLabel');
var PrestigeButton = document.querySelector('#PrestigeButton');
PrestigeButton.style.visibility = "hidden";
ProgressLabel.style.visibility = "hidden";

var SkullLabel = document.querySelector('#SkullLabel');
var SkullCount = document.querySelector('#SkullCount');
var Skull = document.querySelector('#Skull');



var PotriculeSpeedButton = document.querySelector('#BuyPotriculeSpeed');
var NewsLetter = document.querySelector("#News");

let game ={
 bipki: 0.0,
 potricule: 0,
 potricule_speed: 1,
 last_tick: Date.now(),
 headki:0,
 skulls:0,
 potricule_speed_upgrade:false,
 potricule_speed_max_upgrade:false,
 potricule_generator: false,
 potricule_generator_multiplier:1,
 potricule_generator_price:1,
 headki_multpilier:1,
 skull_potricule_multiplyer:1,
 headki_factor: 2,
 skulls_buff_bought:0,
 skulls_max: 0,
 skulls_multiplier: 1,
 game_version: 0.1,
}
let autosave_timer = 0;
let potricule_timer = 1;
let headki_timer = 1;
const delta = 0.016;

let potricule_price = 5*game.potricule;
let potricule_speed_price = (game.potricule_speed*2)**3
let potricule_speed_gui
function Main(){
  if (game.potricule_generator){
    game.potricule += 1*game.potricule_generator_multiplier;
  }
  potricule_speed_gui = PotriculeTick();

  if (headki_timer >= 0.45){
    HeadkiTick();
    headki_timer = 0;
  }

  if (game.skulls_max < game.skulls){
    game.skulls_max = game.skulls;
  }

  UpdatePrices();
  UpdateGUI();
  headki_timer += delta;

  if (Date.now()-game.last_tick>= 1000){ // оффлайн прогресс 
    let diff = Date.now() -game.last_tick;
    game.last_tick = Date.now();
    if (diff > 16*1e+9){
      diff = 16*1e+6;
    }
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


function HeadkiTick(){
  if (getRandomInt(1,100) >= 101 - game.headki){
    game.skulls += (Math.floor(game.headki*0.01)+1)*game.skulls_multiplier;
  }
  else{
    game.skulls += Math.floor(game.headki*0.01)*game.skulls_multiplier;
  }
}

function PotriculeTick(){
  let diff = game.potricule;
  diff *= 0.016667
  diff *= game.potricule_speed;
  diff *= game.skull_potricule_multiplyer;
  diff *= game.skulls_max**(game.skulls_buff_bought*0.25);
  game.bipki += diff;
  return diff*60
}





function UpdatePrices(){
  potricule_price = 10*game.potricule;
  if (game.potricule >= 100){
    potricule_price = (10**Math.floor(Math.log10(game.potricule)))*game.potricule
  }
  if (game.potricule_generator){
    potricule_price = 1e+14*(Math.floor(10**(game.potricule_generator_multiplier**0.5)))*game.potricule_generator_price;
  }


  if (game.potricule_speed_upgrade){
    potricule_speed_price = (game.potricule_speed*2+8)**2.2;
  }
  else{
    potricule_speed_price = (game.potricule_speed*2+8)**3; 
  }
}

function UpdateGUI(){
  if (game.headki > 0){
    Skull.style.contentVisibility = "visible";
  }
  BipkiL.textContent= "You have " + NumberNotation(game.bipki)+ " Bipki";
  BipkiIncreaseL.textContent= NumberNotation(potricule_speed_gui) + " B/S";

  if (!game.potricule_generator){
    PotriculeLabel.textContent = "Buy potricule (" + NumberNotation(game.potricule,2,true)+ ")";
  }
  else{
    PotriculeLabel.textContent = "Upgrade PG (" + NumberNotation(game.potricule,2,true)+ ")";
    PotriculeLabel.style.color = "red";
    PotriculeLabel.style.backgroundColor = "#110000";
    PotriculeButton.style.borderColor = "red";
    PotriculeButton.style.backgroundImage = "linear-gradient(#250000, #000)"
  }
  PotriculeSpeedLabel.textContent = "Upgrade potricules (x" + NumberNotation(game.potricule_speed,0,true)+ ")";

  SkullLabel.textContent = NumberNotation(game.headki,2,true)+" Headki" + " → " + NumberNotation(game.headki,0,true)+"% 💀";
  SkullCount.textContent = NumberNotation(Math.floor(game.skulls),2,true)+"💀";
  UpdateSkullShop();




  ProgressLabel.textContent = NumberNotation(game.bipki*(1e-4),1)+"%";
  if (game.bipki >= 10000){
    ProgressLabel.style.visibility = "visible";
    PrestigeButton.style.visibility = "hidden";
  }
  if (game.bipki > 1e+6){
    let headki = Math.floor(Math.log2(game.bipki*(1e-6))/Math.log2(game.headki_factor)+1);
    PrestigeButton.style.visibility = "visible";
    ProgressLabel.textContent = NumberNotation(100 - (((game.headki_factor**(headki)*1e+6) - game.bipki) / ( game.headki_factor**(headki)*1e+6 -game.headki_factor**(headki-1)*1e+6))*100) +"%";
    PrestigeButton.textContent = "Gain Headki: "+ NumberNotation(headki*game.headki_multpilier*Math.floor(Math.log2(game.bipki*1e-6) / Math.log2(game.headki_factor) *0.2+1),2,true);
  }


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
  if (game.potricule_speed >=64 && game.potricule_speed_max_upgrade==false){
    PotriculeSpeedButton.textContent = "MAX";
    PotriculeSpeedButton.style.color = "red";
  }
}

function BuyPotricule(){
  if (game.bipki >= potricule_price){
    game.bipki-=potricule_price;
    if (game.potricule_generator){
      game.potricule_generator_multiplier *= 10;
    }
    else{
      game.potricule+= 1;
    }
    UpdatePrices();
  }
}
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function BuyPotriculeSpeed(){
 if (game.bipki >= potricule_speed_price && (game.potricule_speed < 64 || game.potricule_speed_max_upgrade)){
  game.bipki-=potricule_speed_price;
  game.potricule_speed*=2;
  UpdatePrices();
 }
}


function Prestige(){
  game.headki += Math.floor(Math.log2(game.bipki*(1e-6))/Math.log2(game.headki_factor)+1)*game.headki_multpilier*Math.floor(Math.log2(game.bipki*1e-6) / Math.log2(game.headki_factor) *0.2+1);
  game.potricule = 0;
  game.bipki = 0;
  game.potricule_speed = 1;
  PrestigeButton.style.visibility = "hidden";
  PrestigeLabel.style.visibility = "hidden";
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
    last_tick: Date.now(),
    headki:0,
    skulls:0,
    potricule_speed_upgrade:false,
    potricule_speed_max_upgrade:false,
    potricule_generator: false,
    potricule_generator_multiplier:1,
    potricule_generator_price:1,
    headki_multpilier:1,
    skull_potricule_multiplyer:1,
    headki_factor: 2,
    skulls_buff_bought:0,
    skulls_max: 0,
    skulls_multiplier: 1,
  }
  SaveGame();
}
 
 
if (localStorage.getItem("bipkisave")){
  LoadGame();
  UpdatePrices();
}
setInterval(Main, 16);
