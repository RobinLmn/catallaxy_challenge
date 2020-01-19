var display = function() {
  var checked = document.getElementById("myCheck").checked;
  var btc_mined = document.getElementById("btc_mined");
  var hashpower = document.getElementById("hashpower");

  if (checked) {
    btc_mined.style.display = "none";
    hashpower.style.display = "block";
  } else {
    btc_mined.style.display = "block";
    hashpower.style.display = "none";
  }
};

var calcul = function() {
  var hr = document.getElementById("HashingPower").value;
  var hashrate = parseFloat(hr);

  var unit = document.getElementById("mySelect").value;
  
  switch(unit) {
    case "KH/s":
      harshrate *= 10**3;
      break;
    case "MH/s":
      harshrate *= 10**6;
      break;
    case "GH/s":
      hashrate *= 10**9;
      break;
    case "TH/s":
      harshrate *= 10**12;
      break;
  } 

  var btc = document.getElementById("BitcoinsMined").value;
  var bitcoins_mined = parseFloat(btc);

  var checked = document.getElementById("myCheck").checked;

  var power_consumption = document.getElementById("PowerConsumption").value;
  var power_cons = parseFloat(power_consumption);

  var power_cost_str = document.getElementById("PowerCost").value;
  var power_cost = parseFloat(power_cost_str);

  var fee_str = document.getElementById("Fee").value;
  var fee = parseFloat(fee_str);

  t = 84600;

  const xhttp = new XMLHttpRequest();

  xhttp.open(
    "GET",
    "https://blockexplorer.com/api/status?q=getDifficulty&fbclid=IwAR1Op2Trtzp6FGMMkU0O4LwYkq2EuoBFe90RzkdhKI3EYZiy80rZHEIm8ts",
    true
  );

  xhttp.onreadystatechange = function() {
    console.log(this.readyState);
    console.log(this.status);
    if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
      // Typical action to be performed when the document is ready:
      const obj = JSON.parse(xhttp.responseText);
      const d = obj.difficulty;
      console.log("result", d);
      compute_and_display(hashrate, bitcoins_mined, d);
    }
  }

  xhttp.send();
  console.log("HA");
  console.log("HO");
};

var hr_to_btc = function(hr, d, t=84600) {
  
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var a = (hr / ghr) * r;
  return a;
};

var btc_to_hr = function(a, d, t=84600) {
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var hr = (a / r) * ghr;

  return hr;
};

var btc_to_dollar = function(btc) {
  var dollar_one_btc = 8938.65;
  return dollar_one_btc * btc;
};

var electricity_cost = function(power_cons, power_cost, t=84600){
  /*  power consumption -> Watt
      power cost -> $ / kWh

      electricty cost = cons * t * power cost
  */
  var tot_cost = power_cons * t * power_cost;
  return tot_cost;
}

var profits = function(cost, earned, fees){
    return earned - cost - (earned *  fees /100);
}

var compute_and_display = function(hashrate, bitcoins_mined, d){

  var day = 84600
  var resultat_day;
  var resultat_week;
  var resultat_month;
  var resultat_year;

  if (checked) {
    resultat_day, resultat_month, resultat_week, resultat_year = compute_results(hashrate, hr_to_btc, d);
  } else {
    resultat_day, resultat_month, resultat_week, resultat_year = compute_results(bitcoinsmined, btc_to_hr, d);
  }

  console.log(result_day); 

  var resultat_doll_day = btc_to_dollar(resultat_day);
  var resultat_doll_week = btc_to_dollar(resultat_week);
  var resultat_doll_month = btc_to_dollar(resultat_month);
  var resultat_doll_year = btc_to_dollar(resultat_year);

  document.getElementById("result_doll_day").innerHTML = resultat_doll_day + "";
  document.getElementById("result_doll_week").innerHTML = resultat_doll_week + "";
  document.getElementById("result_doll_month").innerHTML = resultat_doll_month + "";
  document.getElementById("result_doll_year").innerHTML = resultat_doll_year + "";

  var elec_cost_day = electricity_cost(power_cons, power_cost);
  var elec_cost_week = electricity_cost(power_cons, power_cost, day*7);
  var elec_cost_month = electricity_cost(power_cons, power_cost, day*31);
  var elec_cost_year = electricity_cost(power_cons, power_cost, day*365);

  document.getElementById("elec_day").innerHTML = elec_cost_day + "";
  document.getElementById("elec_week").innerHTML = elec_cost_week + "";
  document.getElementById("elec_month").innerHTML = elec_cost_month + "";
  document.getElementById("elec_year").innerHTML = elec_cost_year + "";

  var profit_day = profits(resultat_day, elec_cost_day, fee);
  var profit_week = profit(resultat_week, elec_cost_week, fee);
  var profit_month = profit(resultat_month, elec_cost_month, fee);
  var profit_year = profit(resultat_year, elec_cost_year, fee);

  document.getElementById("profit_day").innerHTML = profit_day + "";
  document.getElementById("profit_week").innerHTML = profit_week + "";
  document.getElementById("profit_month").innerHTML = profit_month + "";
  document.getElementById("profit_year").innerHTML = profit_year + "";
}

var compute_results = function(variable, f, d=0){
    var resultat_day = f(variable, d);
    var resultat_week = f(variable, d, day*7);
    var resultat_month = f(variable, d, day*31);
    var resultat_year = f(variable, d, day*365);
    
    document.getElementById("result_day").innerHTML = resultat_day + "";
    document.getElementById("result_week").innerHTML = resultat_week + "";
    document.getElementById("result_month").innerHTML = resultat_month + "";
    document.getElementById("result_year").innerHTML = resultat_year + "";

    return resultat_day, resultat_month, resultat_week, resultat_year;
}
//var h = 2367890000
