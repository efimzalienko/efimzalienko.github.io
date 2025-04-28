function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


var NumberL = document.querySelector('#TheNumber');

var NumberIncreaseL = document.querySelector('#TheNumberIncrease');

var Button = document.querySelector('#IncreaseButton');
let a = 0.0;
let b = 1;
async function Main(){
 while (1 == 1){
   a += b;
   NumberL.textContent= a;
   NumberIncreaseL.textContent= b;
   await sleep(1.6);
  }
};





function ButtonPressed(){
 if (a >= 250*b){
  a-=250*b;
  b+=10;
  Button.textContent = 250*b;
 }
}






Main();


