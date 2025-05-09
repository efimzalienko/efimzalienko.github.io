var BipkiL = document.querySelector('#TheNumber');

var BipkiIncreaseL = document.querySelector('#TheNumberIncrease');

var PotriculeButton= document.querySelector('#BuyPotricule');

var PotriculeSpeedButton = document.querySelector('#BuyPotriculeSpeed');
var NewsLetter = document.querySelector("#News");
NewsLetter.addEventListener("animationend",NewsFinish)
let game ={
 bipki: 0.0,
 potricule: 0,
 potricule_speed: 1,
 last_tick: Date.now()
}
let autosave_timer = 0;
let potricule_timer = 1;
let news_timer = 0;
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
    if (diff > 16*1e+6){
      diff = 16*1e+6;
    }
    while (diff > 0){
      diff -=16;
      Main();
    };
  }

  game.last_tick = Date.now();
  autosave_timer += delta;
  news_timer += delta;
  if (news_timer >= 62){
    news_timer = 0;
    NewsFinish();
  }
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

function NewsFinish(){
  NewsLetter.textContent = news[getRandomInt(0, 39)];
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
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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
  else{

  }
}

function BuyPotriculeSpeed(){
 if (game.bipki >= potricule_speed_price){
  game.bipki-=potricule_speed_price;
  game.potricule_speed*=2;
  UpdatePrices();
 }
}


const news = {
  "0": "Privet Dibio",
  "1": "Privet Kryzhyk",
  "2": "Privet Keb🍌",
  "3": "Privet 💀",
  "4": "Privet Efimza",
  "5": "Privet Gig",
  "6": "Privet Vitas2222222222222222222222222222222222222222222222222222222222222222222",
  "t": "Privet Илья",
  "8": "Privet Bipka",
  "9": "Bipki dimensions!",
  "10": "Bipki 2",
  "11": "Universal Bipki?",
  "12": "The best JoJo part is Battle Tendency",
  "13": "Gig, buy Sekiro",
  "14": "Keb, buy Factorio",
  "15": "Also try Eyescape",
  "16": "The binding of Bipki",
  "17": "Bipki Eternal",
  "18": "Barnaul",
  "19": "Privet Egorsi4ek",
  "20": "2 hours of pain",
  "21": "Vitas22222: I PUSH THE WHOLE CHOCOPIE INTO MY MOUTH",
  "22": "Vitas22222: It is a cool game",
  "23": "Vitas22222: ????????????",
  "24": "Vitas22222: А что смешного?",
  "25": "Vitas22222: This is done according to the guides",
  "26": "Vitas22222: Bipki",
  "27": "••• Vitas2222 typing...",
  "28": "Vitas22222: this is kind of funny xdd",
  "29": "Vitas22222: HOW MUCH OF YOU ARE PISSING ME OUT",
  "30": "Vitas22222: YA ekspert zdravogo smysla",
  "31": "Vitas22222: There seems to be a deep plot here",
  "32": "Ligime",
  "33": "One potricule produces 0.1 Bipki, thats everything we know about them",
  "34": "Bipki are extremely powerful and useful, aaaaaaand you can't make em...                                 ...but potricules can!",
  "35": "Fishy game",
  "36": "MOAR Bipki",
  "37": "Potricule ---> Bipki",
  "38": "In next update you'll be able to take Bipki on your wallet!!!                                                            maybe",
  "39": "Incrementals are cool"
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
  SaveGame();
}
 
 
if (localStorage.getItem("bipkisave")){
  LoadGame();
  UpdatePrices();
}
NewsLetter.textContent = news[getRandomInt(0, 39)];

setInterval(Main, 16);
