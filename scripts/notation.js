function NumberNotation(number, round = 2, integer = false){
    if (number < 1e+3){
        if (integer){
            return number.toString();
        }
      return number.toFixed(round)
    }

    if (number < 1e+6){
      return ((number*1e-3).toFixed(round)).toString()+"k";
    }
    if (number < 1e+9){
      return ((number*1e-6).toFixed(round)).toString()+"M";
    }
    if (number < 1e+12){
      return ((number*1e-9).toFixed(round)).toString()+"B";
    }
    if (number < 1e+15){
      return ((number*1e-12).toFixed(round)).toString()+"T";
    }
    if (number < 1e+18){
      return ((number*1e-15).toFixed(round)).toString()+"Qa";
    }
    if (number < 1e+21){
      return ((number*1e-18).toFixed(round)).toString()+"Qt";
    }
    if (number < 1e+24){
      return ((number*1e-21).toFixed(round)).toString()+"Sx";
    }
    if (number < 1e+27){
      return ((number*1e-24).toFixed(round)).toString()+"Sp";
    }
    if (number < 1e+30){
      return ((number*1e-27).toFixed(round)).toString()+"Oc";
    }
    if (number < 1e+33){
      return ((number*1e-30).toFixed(round)).toString()+"No";
    }
    else{
      return number.toExponential(2).toString();
    }
  }