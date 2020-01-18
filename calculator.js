//var d = 14776367535688 ; # bits
//var r = 12.5 ;   # bitcoin
//var t = 84600 ;
//var h = 2367890000 ;

var hashRateToBtc = function(hr, d) {
    var r = 12.5;
    var ghr = d * Math.pow(2, 32) / (t);
    var a = hr / ghr * r;
    return a;
}

var btcToHashrate(a, d) {
    var r = 12.5;
    var ghr = d * Math.pow(2, 32) / (t);
    var hr = (a / r) * ghr;
    return hr;
}

var btcToDollar(btc) {
    var dollarOneBtc = 8938.65;
    var btcTotal = dollarOneBtc * btc;
}