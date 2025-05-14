skull_buy_1 = document.querySelector("#skull_buy_1");
skull_buy_2 = document.querySelector("#skull_buy_2");
skull_buy_3 = document.querySelector("#skull_buy_3");
skull_buy_4 = document.querySelector("#skull_buy_4");
skull_buy_5 = document.querySelector("#skull_buy_5");
skull_buy_6 = document.querySelector("#skull_buy_6");
skull_buy_7 = document.querySelector("#skull_buy_7");
skull_buy_8 = document.querySelector("#skull_buy_8");
skull_buy_9 = document.querySelector("#skull_buy_9");

skull_price_1 = document.querySelector("#skull_price_1");
skull_price_2 = document.querySelector("#skull_price_2");
skull_price_3 = document.querySelector("#skull_price_3");
skull_price_4 = document.querySelector("#skull_price_4");
skull_price_5 = document.querySelector("#skull_price_5");
skull_price_6 = document.querySelector("#skull_price_6");
skull_price_7 = document.querySelector("#skull_price_7");
skull_price_8 = document.querySelector("#skull_price_8");
skull_price_9 = document.querySelector("#skull_price_9");



let prices = [10, 100, 150, 1000, 5000, 25000, 1e+5,25e+4,5e+5];

function UpdateSkullShop(){
    prices[0] = (10**(game.skull_potricule_multiplyer**0.5)).toFixed(0);
    prices[2] = (game.headki_multpilier**2)*200;
    prices[4] = 150*((game.headki_factor)**6);
    prices[6] = 1e+6*(game.potricule_generator_price**-1);
    prices[8] = 5e+5*game.skulls_multiplier**2
    skull_price_1.textContent = NumberNotation(prices[0],2,true) + "💀";
    skull_price_3.textContent = NumberNotation(prices[2],2,false) + "💀";
    skull_price_5.textContent = NumberNotation(prices[4],2,false) + "💀";
    skull_price_7.textContent = NumberNotation(prices[6],2,false) + "💀";
    skull_price_9.textContent = NumberNotation(prices[8],2,false) + "💀";

    if(game.skulls >= prices[0]){
        skull_buy_1.disabled = false;
    }
    else {skull_buy_1.disabled = true;}


    if (game.skulls_buff_bought == 0){
        if(game.skulls >= prices[1]){
            skull_buy_2.disabled = false;
        }
        else {skull_buy_2.disabled = true;}
    }
    else{
        skull_buy_2.disabled = true;
        skull_price_2.textContent = "MAX"; 
    }


    if(game.skulls >= prices[2]){
        skull_buy_3.disabled = false;
    }
    else {skull_buy_3.disabled = true;}

    if(game.potricule_speed_max_upgrade == false){
        if(game.skulls >= prices[3]){
            skull_buy_4.disabled = false;
        }
        else {skull_buy_4.disabled = true;}
    }
    else{
        skull_buy_4.disabled = true;
        skull_price_4.textContent = "MAX";
    }

    if (game.headki_factor > 1.2){
        if(game.skulls >= prices[4]){
            skull_buy_5.disabled = false;
        }
        else {skull_buy_5.disabled = true;}
    }
    else{
        skull_buy_5.disabled = true;
        skull_price_5.textContent = "MAX";
    }

    if (game.potricule_generator == false){
        if(game.skulls >= prices[5]){
            skull_buy_6.style.color = "red";
            skull_buy_6.disabled = false;
        }
        else {skull_buy_6.disabled = true;}
    }
    else{
        skull_buy_6.disabled = true;
        skull_buy_6.style.color = "red";
        skull_price_6.textContent = "MAX";
    }

    if(game.skulls >= prices[6]){
        skull_buy_7.disabled = false;
    }
    else {skull_buy_7.disabled = true;}

    if (!game.potricule_speed_upgrade){
        if(game.skulls >= prices[7]){
            skull_buy_8.disabled = false;
        }
        else {skull_buy_8.disabled = true;}
    }
    else{
        skull_buy_8.disabled = true;
        skull_price_8.textContent = "MAX";
    }

    if(game.skulls >= prices[8]){
        skull_buy_9.disabled = false;
    }
    else {skull_buy_9.disabled = true;}
}



function BuySkull1(){ 
    game.skulls -= prices[0];
    game.skull_potricule_multiplyer *= 4;
}

function BuySkull2(){
    game.skulls -= prices[1];
    game.skulls_buff_bought = 1; 
}

function BuySkull3(){
    game.skulls -= prices[2];
    game.headki_multpilier *= 2;
}

function BuySkull4(){
    game.skulls -= prices[3];
    game.potricule_speed_max_upgrade = true;
}

function BuySkull5(){
    game.skulls -= prices[4];
    game.headki_factor -= 0.1;
}

function BuySkull6(){
    game.skulls -= prices[5];
    game.potricule_generator = true;
}

function BuySkull7(){
    game.skulls -= prices[6];
    game.potricule_generator_price *= 0.01;
}

function BuySkull8(){
    game.skulls -= prices[7];
    game.potricule_speed_upgrade = true;
}

function BuySkull9(){
    game.skulls -= prices[8];
    game.skulls_multiplier *= 3;
}
