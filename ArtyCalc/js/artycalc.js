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

  if ((validPos(uPos)) && (validPos(tgtPos))) {
    var x1,x2,y1,y2;
    x1 = getPosComp(uPos,"x");
    x2 = getPosComp(tgtPos,"x");
    y1 = getPosComp(uPos,"y");
    y2 = getPosComp(tgtPos,"y");
    display.innerHTML = x1 + ", " + y1 +
    "<br />" + x2 + ", " + y2 +
    "<br />Distance: " + getDist(x1,y1,x2,y2);
  }

}
function getDist (x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}
function validPos (pos){
return pos.length ==8;
}
function getPosComp(pos, ask){
  var take = pos.length /2;
  if (ask == "x"){
    return pos.substring(0,take);
  }
  else if (ask == "y") {
    return pos.substring(take,take*2);
  }

}
function insZero(pos){
  return pos.substring(0,3) + 0 + pos.substring(4,6) + 0;
}
