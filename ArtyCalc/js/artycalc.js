document.getElementById("btn").onclick=function(){calcArty()};

function calcArty(){
  var disp = document.getElementById('display');
  disp.innerHTML = "";
  var uPos = document.getElementById('upos').value;
  var tgtPos = document.getElementById('tgtpos').value;
  if (uPos.length ==6) {
    uPos = insZero(uPos);
  }
  if (tgtPos.length == 6) {
    tgtPos = insZero(tgtPos);
  }

  if (true) {
    var x1,x2,y1,y2;
    x1 = getPosComp(uPos,"x");
    x2 = getPosComp(tgtPos,"x");
    y1 = getPosComp(uPos,"y");
    y2 = getPosComp(tgtPos,"y");
    var rads = getRads(x1,y1,x2,y2);
    var degs = radsToDegs(rads);
    display.innerHTML = x1 + ", " + y1 +
    "<br />" + x2 + ", " + y2 +
    "<br />Distance: " + getDist(x1,y1,x2,y2) +"m"
    +"<br />" + rads + ", (" + degs+")";
  }

}
function getRads (x1,y1,x2,y2){
  var x = x2-x1;
  var y = y2-y1;
  var fract;
  if (y > 0) {
    fract = y/x;
  }
  else {
    fract = x/y;
  }
  var rad = Math.atan(fract);
  return rad;
}
function radsToDegs(rads){
  return rads * (180/Math.PI)
}
function getDist (x1,y1,x2,y2){
  var num = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))*10
  return num.toFixed(2);
}
function validPos (pos){
return pos.length ==8;
}
function getPosComp(pos, ask){
  var take = 4;
  if (ask == "x"){
    return pos.substring(0,take);
  }
  else if (ask == "y") {
    return pos.substring(take,take*2);
  }

}
function insZero(pos){
  return pos.substring(0,3) + 0 + pos.substring(3,pos.length) + 0;
}
