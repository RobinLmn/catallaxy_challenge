var calcul = function() {
  var hashrate = document.getElementById("hashrate");
  var bitcoinsmined = document.getElementById("bitcoinsmined");
  var rewards = document.getElementById("rewards");
  var difficulty = document.getElementById("difficulty");
  var checkBox = document.getElementById("hr_to_btc");

  function myFunction() {
    var x = document.getElementById("myCheck").checked;
    console.log(x);
  }

  if (myFunction()) {
    var resultat1 = hr_to_btc(hashrate, difficulty);
    text.style.display = resultat1;
  } else {
    var resultat2 = btc_to_hr(bitcoinsmined, difficulty);
    text.style.display = resultat2;
  }
};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log(xhttp.responseText);

       const obj = JSON.parse(xhttp.responseText);
       console.log(obj.difficulty);
    }
};
xhttp.open("GET", "https://blockexplorer.com/api/status?q=getDifficulty&fbclid=IwAR1Op2Trtzp6FGMMkU0O4LwYkq2EuoBFe90RzkdhKI3EYZiy80rZHEIm8ts", true);
xhttp.send(); 

var hr_to_btc = function(hr, d) {
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

//var d = 14776367535688;
//var h = 2367890000;
