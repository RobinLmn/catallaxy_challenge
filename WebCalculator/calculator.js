var display = function() {
  var checked = document.getElementById("myCheck").checked;
  var btc_mined = document.getElementById("btc_mined");
  var hashpower = document.getElementById("hashpower");
  var btc_to_hr_txt = document.getElementById("btc_to_hr");
  var hr_to_btc_txt = document.getElementById("hr_to_btc");

  if (checked) {
    btc_mined.style.display = "none";
    hashpower.style.display = "block";
    hr_to_btc_txt.style.display = "block";
    btc_to_hr_txt.style.display = "none";
  } else {
    btc_mined.style.display = "block";
    hashpower.style.display = "none";
    hr_to_btc_txt.style.display = "none";
    btc_to_hr_txt.style.display = "block";
  }
};

var calcul = function() {
  var hr = document.getElementById("HashingPower").value;
  var hashrate = parseFloat(hr);

  var unit = document.getElementById("mySelect").value;

  
  switch(unit) {
    case "KH/s":
      hashrate *= Math.pow(10,3);
      break;
    case "MH/s":
      hashrate *= Math.pow(10,6);
      break;
    case "GH/s":
      hashrate *= Math.pow(10,9);
      break;
    case "TH/s":
      hashrate *= Math.pow(10,12);
      break;
  } 

  var btc = document.getElementById("BitcoinsMined").value;
  var bitcoins_mined = parseFloat(btc);

  const xhttp = new XMLHttpRequest();
  //console.log(hashrate)

  xhttp.open(
    "GET",
    "https://blockexplorer.com/api/status?q=getDifficulty&fbclid=IwAR1Op2Trtzp6FGMMkU0O4LwYkq2EuoBFe90RzkdhKI3EYZiy80rZHEIm8ts",
    true
  );

  xhttp.onreadystatechange = function() {
    //console.log(this.readyState);
    //console.log(this.status);
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
      // Typical action to be performed when the document is ready:
      const obj = JSON.parse(xhttp.responseText);
      const d = obj.difficulty;
     // console.log("result", d);
      compute_and_display(hashrate, bitcoins_mined, d);
    }
  }

  xhttp.send();
};

var hr_to_btc = function(hr, d, t=84600) {
  
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var a = (hr / ghr) * r;
  return a ;
};

var btc_to_hr = function(a, d, t=84600) {
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var hr = (a / r) * ghr;

  return hr;
};

var btc_to_dollar = function(btc) {
  var dollar_one_btc = 8938.65;
  return (dollar_one_btc * btc);
};

var electricity_cost = function(power_cons, power_cost, t=84600){
  /*  power consumption -> Watt
      power cost -> $ / kWh

      electricty cost = cons * t * power cost
  */
  var tot_cost = power_cons * t * power_cost;
  return tot_cost;
}

var profits = function(earned, cost, fees){
    return (earned - cost - (earned *  fees /100)).toFixed(2);
}

var compute_and_display = function(hashrate, bitcoins_mined, d){
  var checked = document.getElementById("myCheck").checked;

  var power_consumption = document.getElementById("PowerConsumption").value;
  var power_cons = parseFloat(power_consumption);

  var power_cost_str = document.getElementById("PowerCost").value;
  var power_cost = parseFloat(power_cost_str);

  var fee_str = document.getElementById("Fee").value;
  var fee = parseFloat(fee_str);

  var day = 84600;

  var resultat_day;
  var resultat_week;
  var resultat_month;
  var resultat_year;

  var to_display;
  var unit_display;

  if (checked) {
    to_display = "Bitcoins Mined: ";
    unit_display = "BTC"
    [resultat_day, resultat_month, resultat_week, resultat_year] = compute_results(hashrate, hr_to_btc, to_display, unit_display, d);
  } else {
    [resultat_day, resultat_month, resultat_week, resultat_year] = compute_results(bitcoinsmined, btc_to_hr, to_display, unit_display, d);
    to_display = "Hash Rate: "
    unit_display = "H/s"
  }

  decimals = 6;

  var resultat_doll_day = btc_to_dollar(resultat_day);
  var resultat_doll_week = btc_to_dollar(resultat_week);
  var resultat_doll_month = btc_to_dollar(resultat_month);
  var resultat_doll_year = btc_to_dollar(resultat_year);

 document.getElementById("result_doll_day").innerHTML = "Dollar/day: " +resultat_doll_day.toExponential(3) + " $";
  document.getElementById("result_doll_week").innerHTML = "Dollar/week: " +resultat_doll_week.toExponential(3)+ " $";
  document.getElementById("result_doll_month").innerHTML = "Dollay/month: " +resultat_doll_month.toExponential(3)+" $";
  document.getElementById("result_doll_year").innerHTML = "Dollar/year: " +resultat_doll_year.toExponential(3)+" $";

  var elec_cost_day = electricity_cost(power_cons, power_cost);
  var elec_cost_week = electricity_cost(power_cons, power_cost, day*7);
  var elec_cost_month = electricity_cost(power_cons, power_cost, day*31);
  var elec_cost_year = electricity_cost(power_cons, power_cost, day*365);

  document.getElementById("elec_day").innerHTML ="Power Cost/day: " + elec_cost_day.toExponential(3) + "$";
  document.getElementById("elec_week").innerHTML = "Power Cost/week: " + elec_cost_week.toExponential(3) + "$";
  document.getElementById("elec_month").innerHTML = "Power Cost/month: " +elec_cost_month.toExponential(3)+ "$";
  document.getElementById("elec_year").innerHTML = "Power Cost/year: " +elec_cost_year.toExponential(3)+"$";

  var profit_day = profits(resultat_doll_day, elec_cost_day, fee);
  var profit_week = profits(resultat_doll_week, elec_cost_week, fee);
  var profit_month = profits(resultat_doll_month, elec_cost_month, fee);
  var profit_year = profits(resultat_doll_year, elec_cost_year, fee);


  document.getElementById("profit_day").innerHTML = "Profit/day: " + round(profit_day, decimals) + "$";
  document.getElementById("profit_week").innerHTML = "Profit/week: " + round(profit_week, decimals) + "$";
  document.getElementById("profit_month").innerHTML = "Profit/month: " + round(profit_month, decimals) + "$";
  document.getElementById("profit_year").innerHTML = "Profit/year: " + round(profit_year, decimals) + "$";

  // return elec_cost_day, elec_cost_week, elec_cost_month, elec_cost_year;
}

var compute_results = function(variable, f, to_display, unit_display, d=0){
    var day = 86400;
    
    var resultat_day = f(variable, d);
    var resultat_week = f(variable, d, day*7);
    var resultat_month = f(variable, d, day*31);
    var resultat_year = f(variable, d, day*365);
    
    document.getElementById("result_day").innerHTML = to_display + resultat_day.toExponential(3) + unit_display;
    document.getElementById("result_week").innerHTML = to_display + resultat_day.toExponential(3) + unit_display;
    document.getElementById("result_month").innerHTML = to_display + resultat_day.toExponential(3)+ unit_display;
    document.getElementById("result_year").innerHTML = to_display + resultat_day.toExponential(3) + unit_display;

    return [resultat_day, resultat_month, resultat_week, resultat_year];
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

//var h = 2367890000
