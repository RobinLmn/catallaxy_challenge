var d;

var calcul = function() {
  var hr = document.getElementById("HashingPower").value;
  var hashrate = parseInt(hr);
  var bitcoinsmined = document.getElementById("bitcoinsmined");
  var rewards = document.getElementById("rewards");
  var checked = document.getElementById("myCheck").checked;
  var btc_mined = document.getElementById("btc_mined");

  t = 84600;

  ///////////////////////////////////////

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      // Typical action to be performed when the document is ready:
      const obj = JSON.parse(xhttp.responseText);
      d = obj.difficulty;
    }
  };
  xhttp.open(
    "GET",
    "https://blockexplorer.com/api/status?q=getDifficulty&fbclid=IwAR1Op2Trtzp6FGMMkU0O4LwYkq2EuoBFe90RzkdhKI3EYZiy80rZHEIm8ts",
    true
  );
  xhttp.send();

  //////////////////////////////////////////////

  if (checked) {
    btc_mined.style.dsplay = "none";
    var resultat1 = hr_to_btc(hashrate);
    console.log(resultat1);
  } else {
    var resultat2 = btc_to_hr(bitcoinsmined);
    console.log(resultat2);
  }
};

var hr_to_btc = function(hr) {
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var a = (hr / ghr) * r;

  return a;
};

var btc_to_hr = function(a, d) {
  var t = 84600;
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var hr = (a / r) * ghr;

  return hr;
};

var btc_to_dollar = function(btc) {
  var dollar_one_btc = 8938.65;
  return dollar_one_btc * btc;
};

//var h = 2367890000;
