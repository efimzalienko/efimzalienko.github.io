function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms*1000));
}


var BipkiL = document.querySelector('#TheNumber');

var BipkiIncreaseL = document.querySelector('#TheNumberIncrease');

var PotriculeButton= document.querySelector('#BuyPotricule');

var PotriculeSpeedButton = document.querySelector('#BuyPotriculeSpeed');





let bipki = 1.0;
let potricule = 0;

let potricule_speed = 1;
let potricule_timer = 1;
const delta = 0.016;


async function Main(){
 while (1 == 1){
   if (potricule_timer >= 1){
    if (potricule_speed >=64){
      bipki += potricule*0.1*potricule_speed*0.03125;
    }
    bipki += potricule*0.1;
    potricule_timer = 0;
   }

   BipkiL.textContent= "You have " +bipki.toFixed(1).toString()+ " Bipki";
   BipkiIncreaseL.textContent= potricule*0.1*potricule_speed.toFixed(1).toString() + " B/T";

   potricule_timer += delta*potricule_speed;
   
   if (bipki >= 5**potricule*0.5+0.5){
    PotriculeButton.style.color = "green";
   }
   if (bipki >= 5**potricule_speed){
    PotriculeSpeedButton.style.color = "green";
   }
   await sleep(delta);
  }
};





function BuyPotricule(){

 let potricule_price = 5**potricule*0.5+0.5;

 if (bipki >= potricule_price){
  bipki-=potricule_price;
  potricule+=1;

  potricule_price = 5**potricule*0.5+0.5

  PotriculeButton.textContent = potricule_price;
  if (bipki < potricule_price){
   PotriculeButton.style.color = "red";
  }
 }
}



function BuyPotriculeSpeed(){
 let potricule_speed_price = 5**potricule_speed

 if (bipki >= 5**potricule_speed){
  bipki-=5**potricule_speed;
  potricule_speed*=2;
  PotriculeSpeedButton.textContent = 5**potricule_speed;
  if (bipki < 5**potricule_speed){
   PotriculeSpeedButton.style.color = "red";
  }
 }
}




Main();


