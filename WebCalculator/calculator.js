

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

  var btc = document.getElementById("BitcoinsMined").value;
  var bitcoins_mined = parseFloat(btc);

  var checked = document.getElementById("myCheck").checked;

  var power_consumption = document.getElementById("PowerConsumption").value;
  var power_cons = parseFloat(power_consumption);

  var power_cost_str = document.getElementById("PowerCost").value;
  var power_cost = parseFloat(power_cost_str);

  t = 84600;

  ///////////////////////////////////////

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      const obj = JSON.parse(xhttp.responseText);
      const d = obj.difficulty;
      console.log("returned ", d);

      if (checked) {

        var resultat1_day = hr_to_btc(hashrate, d);
        var resultat1_week = hr_to_btc(hashrate, d, );
        var resultat1_month = hr_to_btc(hashrate, d, );
        var resultat1_year = hr_to_btc(hashrate, d, );

        document.getElementById("result_day").innerHTML = resultat1_day + "";
        document.getElementById("result_week").innerHTML = resultat1_week + "";
        document.getElementById("result_month").innerHTML = resultat1_month + "";
        document.getElementById("result_year").innerHTML = resultat1_year + "";


      } else {

        var resultat2_day = btc_to_hr(bitcoins_mined, d, );
        var resultat2_week = btc_to_hr(bitcoins_mined, d, );
        var resultat2_month = btc_to_hr(bitcoins_mined, d, );
        var resultat2_year = btc_to_hr(bitcoins_mined, d, );
        
        document.getElementById("result_day").innerHTML = resultat2_day + "";
        document.getElementById("result_week").innerHTML = resultat2_week + "";
        document.getElementById("result_month").innerHTML = resultat2_month + "";
        document.getElementById("result_month").innerHTML = resultat2_year + "";
      } 

    }
  };
  xhttp.open(
    "GET",
    "https://blockexplorer.com/api/status?q=getDifficulty&fbclid=IwAR1Op2Trtzp6FGMMkU0O4LwYkq2EuoBFe90RzkdhKI3EYZiy80rZHEIm8ts",
    true
  );
  xhttp.send();

  //////////////////////////////////////////////
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
    return earned - cost;
}

//var h = 2367890000;
