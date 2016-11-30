document.getElementById("btn").onclick=function(){calcArty()};

function calcArty(){
  //Main function
  //Calculates distance and angle between 2 ppoints
  var disp = document.getElementById('display');
  disp.innerHTML = "";
  var uPos = document.getElementById('upos').value; //Position 1, assumed this is your position
  var tgtPos = document.getElementById('tgtpos').value; //Poisition 2, assumed target
  if (uPos.length ==6) {
    uPos = insZero(uPos); //Turning 6 digit grids into 8 digit grids
  }
  if (tgtPos.length == 6) {
    tgtPos = insZero(tgtPos); //Again, for P2
  }

  if (true) { //fix this later, as in check if its a valid entry
    var x1,x2,y1,y2;
    //parse strings and obtain x and y component
    x1 = getPosComp(uPos,"x");
    x2 = getPosComp(tgtPos,"x");
    y1 = getPosComp(uPos,"y");
    y2 = getPosComp(tgtPos,"y");

    var rads = getRads(x1,y1,x2,y2);
    var degs = radsToDegs(rads);
    var mrads = rads*1000;
    var distance = getDist(x1,y1,x2,y2);
    mrads = mrads.toFixed(0);
    distance = distance.toFixed(0);
    degs = degs.toFixed(0);
    disp.innerHTML = x1 + ", " + y1 +
    "<br />" + x2 + ", " + y2 +
    "<br />Distance: " + distance +"m" +
    "<br />MRADS:" + mrads + ", (" + degs+"&deg;)";
  }

}
function getScenario (x,y){
  //returns a scenario number based on where the 2 points are
  //x and y are really delta x and delta y
/* This is what it should return
812
7 3
654
*/

  if (x>0) {
    if (y>0) {
    //North East
      return 2;
    }
    else if (y<0) {
    //South East
      return 4;
    }
    else if (y===0) {
    //East
      return 3;
    }
  }
  else if (x<0) {
    if (y>0) {
      //North West
      return 8;
    }
    else if (y<0) {
      //South West
      return 6;
    }
    else if (y===0) {
      //West
      return 7;
    }
  }
  else if (x===0) {
    if (y>0) {
      //North
      return 1;
    }
    else if (y<0) {
      //South
      return 5;
    }
  }
}
function getRads (x1,y1,x2,y2){
  //returns the angle (0=North, increasing clockwise) between point 1 (x1,y1) and point 2 (x2,y2)
  var x = x2-x1;
  var y = y2-y1;
  var scen = getScenario(x,y);
  var fract;
  if (y > 0) {
    fract = y/x;
  }
  else {
    fract = x/y;
  }
  var rad = Math.atan(fract);
  //do magic here
  switch (scen) {
    case 1:
      //Due North
      return 0;
    case 2:
      //NE
      return Math.PI/2 - rad;
    case 3:
      //Due East
      return Math.PI/2;
    case 4:
      //SE
      return Math.PI - rad;
    case 5:
      //South
      return Math.PI;
    case 6:
      //SW
      return Math.PI + rad;
    case 7:
      //West
      return Math.PI*3/2;
    case 8:
      //NW
      return Math.PI*3/2 + rad;
    default:
      return 0;
  }
}
function radsToDegs(rads){
  //converts radians to degrees
  return rads * (180/Math.PI);
}
function getDist (x1,y1,x2,y2){
  //Returns the distance between Point 1 (x1,y1) and Point 2(x2,y2)
  var num = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))*10;
  return num;
}
function validPos (pos){
  //Not used yet? May get rid of
  //Intent was to check if the coordinates were valid

}
function getPosComp(pos, ask){
  //Return the component of the position, ask: x or y axis
  var take = 4;
  if (ask == "x"){
    return pos.substring(0,take);
  }
  else if (ask == "y") {
    return pos.substring(take,take*2);
  }

}
function insZero(pos){
  //inserts a 0 in a 6 digit grid
  return pos.substring(0,3) + 0 + pos.substring(3,pos.length) + 0;
}
