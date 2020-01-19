var calcul = function() {
  var hashrate = document.getElementById("hashrate");
  var bitcoinsmined = document.getElementById("bitcoinsmined");
  var rewards = document.getElementById("rewards");
  var difficulty = document.getElementById("difficulty");
  var checkBox = document.getElementById("hr_to_btc");

  if (checkBox.checked){
    hr_to_btc(hashrate, difficulty);
  } else {
    btc_to_hr(bitcoinsmined, difficulty);
  }
};

var hr_to_btc = function(hr, d) {
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var a = (hr / ghr) * r;

  return a;
};

var btc_to_hr = function(a, d) {
  var r = 12.5;
  var ghr = (d * Math.pow(2, 32)) / t;
  var hr = (a / r) * ghr;

  return hr;
};

var btc_to_dollar = function(btc) {
  var dollar_one_btc = 8938.65;
  return dollar_one_btc * btc;
};

var d = 14776367535688;
var t = 84600;
var h = 2367890000;
console.log(hr_to_btc(h, d));
