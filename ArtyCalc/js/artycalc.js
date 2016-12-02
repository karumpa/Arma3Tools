$(document).ready(function(){
  $("td span").click(function(){
                            console.log("Finally!");
    });
   document.getElementById("btn").onclick=function(){calcArty()};
});
function getRads (x1,y1,x2,y2){
  //returns the angle (0=North, increasing clockwise) between point 1 (x1,y1) and point 2 (x2,y2), in radians
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
  //Returns the distance between Point 1 (x1,y1) and Point 2(x2,y2), returns meters
  //components must be 4 digits
  var num = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))*10;
  return num;
}
function getPosComp(pos, ask){
  //Return the component of the position, ask: x or y axis
  //Must use an 8 digit grid as pos
  var take = 4;
  if (ask == "x"){
    return pos.substring(0,take);
  }
  else if (ask == "y") {
    return pos.substring(take,take*2);
  }
}
function insZero(pos){
  //Converts a 6 digit grid to an 8 digit grid
  if (pos.length == 8) {
    return pos;
  }
  else{
    return pos.substring(0,3) + 0 + pos.substring(3,pos.length) + 0;
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
function verifyFull(str){
  //Checks the validity of the full string
  if (str.length == 6 || str.length == 8){
    let regex = new RegExp("^[0-9]+$");
    //returns true if the str contains only numbers
    return regex.test(str);
  }
  else {
    return false; //if it is not a string, or not 6 or 8 characters long
  }
}
function fullCalc(p1, p2){
  //Cleaner function that does all the work, returns an object [distance in meters, mrads, degrees]
  var mets, mrads, degs; //The results we are looking for
  var rads; // intermediary result
  var x1,x2,y1,y2; //X and Y components of the grids

  //Check to see if the strings provided are valid
  if (verifyFull(p1) && verifyFull(p2)){
    //get the X and Y components
    x1 = getPosComp(p1,"x");
    x2 = getPosComp(p2,"x");
    y1 = getPosComp(p1,"y");
    y2 = getPosComp(p2,"y");
    //get the values we need
    mets = getDist(x1,y1,x2,y2).toFixed(0);
    rads = getRads(x1,y1,x2,y2);
    mrads = (1000*rads).toFixed(0);
    degs = radsToDegs(rads).toFixed(0);
  }
  else{
    mets = "N/A";
    mrads = "N/A";
    degs="N/A";
  }
  var obj = {
    distance: mets,
    mrad: mrads,
    deg: degs
  };
  return obj;
}
function neatCoords(pos){
  return pos.substring(0,4)+", " + pos.substring(4,pos.length);
}
function adjustTgt(cell){
  console.log(cell);
}
function calcArty(){
  //Main function
  //Calculates distance and angle between 2 ppoints
  var posline= document.getElementById('pos1');
  var tgtline= document.getElementById('pos2');
  var solline= document.getElementById('sol');
  var uPos = document.getElementById('upos').value; //Position 1, assumed this is your position
  var tgtPos = document.getElementById('tgtpos').value; //Position 2, assumed target
  uPos = insZero(uPos);
  tgtPos = insZero(tgtPos);
  var solution = fullCalc(uPos,tgtPos);

    posline.innerHTML = neatCoords(uPos);
    tgtline.innerHTML = neatCoords(tgtPos);
    solline.innerHTML = solution.distance +"m" +
    "<br />MRADS: " + solution.mrad +" (" + solution.deg + "&deg;)";
    adj(uPos,tgtPos);
    //draw the trajectory on the canvas
    drawTraj(uPos,tgtPos);
}
function drawTraj(p1,p2){
  //draws a line on the canvas
  var canv = document.getElementById("myCanvas");
  var ctx = canv.getContext("2d");

  x1 = getPosComp(p1,"x");
  x2 = getPosComp(p2,"x");
  y1 = getPosComp(p1,"y");
  y2 = getPosComp(p2,"y");

  var h=canv.height;
  var w=canv.width;
  ctx.clearRect(0,0,w,h);
  ctx.beginPath();
  ctx.arc(x1/9999*w,(1-y1/9999)*h,5,0,2*Math.PI);
  ctx.fillStyle="#FF0000";
  ctx.stroke();
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x2/9999*w,(1-y2/9999)*h,5,0,2*Math.PI);
  ctx.fillStyle="#0000FF";
  ctx.stroke();
  ctx.fill();
  ctx.moveTo(x2/9999*w,(1-y2/9999)*h);
  ctx.lineTo(x1/9999*w,(1-y1/9999)*h);
  ctx.stroke()
}
function adj(p1,p2){
  //builds the Adjustment table
  //p1 does not move, but is compared with a shift in 8 directions X 4 distances
  var arr = [5, 10, 20, 30]; //The distances to adjust, in grid units (1 = 10m)
  var val; //the value printed in the cell
  var sol; //the solution obtained
  var el; //the targeted element
  var letter, id; //combine together to target the element
  var x0, y0; //boolean, if x or y start with 0;
  var newX, newY; //adjusted x,y components in grid units
  var p3; //the new point
  var x, y;
  x = getPosComp(p2,"x");
  y = getPosComp(p2,"y");
  for (var a = 0; a < arr.length; a++) {
    document.getElementById("th"+a).innerHTML = arr[a] * 10 + "m";
  }
  for (var i = 0; i < 8; i++) { //loop through the 8 directions
    x = parseInt(x,10); //convert the coords into integers
    y = parseInt(y,10);
    for (var j = 0; j < arr.length; j++) { //loop through the array of distances
      switch (i) { //There is a better way to do this. Load an array with the letters, figure out the deltas programmatically
        case 0:
          //N
          letter="N";
          newX=x;
          newY=y+arr[j];
          break;
        case 1:
          //NE
          letter="NE";
          newX=x+Math.sqrt(arr[j]);
          newY=y+Math.sqrt(arr[j]);
          break;
        case 2:
          //E
          letter="E";
          newX=x+arr[j];
          newY=y;
          break;
        case 3:
          //SE
          letter="SE";
          newX=x+Math.sqrt(arr[j]);
          newY=y-Math.sqrt(arr[j]);
          break;
        case 4:
          //S
          letter="S";
          newX=x;
          newY=y-arr[j];
          break;
        case 5:
          //SW
          letter="SW";
          newX=x-Math.sqrt(arr[j]);
          newY=y-Math.sqrt(arr[j]);
          break;
        case 6:
          //W
          letter="W";
          newX=x-arr[j];
          newY=y;
          break;
        case 7:
          //NW
          letter="NW";
          newX=x-Math.sqrt(arr[j]);
          newY=y+Math.sqrt(arr[j]);
          break;
      }
      //Round the values to no decimals
      newX = newX.toFixed(0);
      newY = newY.toFixed(0);
      //convert to strings
      newX = newX.toString();
      newY = newY.toString();
      //Add a 0 in front if the grid ref <1000
      if (newX.length < 4){
        for (var z = 0; z <= 4-newX.length; z++) {
          newX = 0+newX;
        }
      }
      if (newY.length <4){
        for (var z = 0; z <= 4-newY.length; z++) {
          newY=0+newY;
        }
      }
      p3 =  newX+newY;
      id = letter + j;
      sol = fullCalc(p1, p3);
      val = sol.distance +"m | " + sol.mrad +" | " +sol.deg+"&deg;<span class='hiddenTbl'>" +p3+"</span>";
      document.getElementById(id).innerHTML = val;
    }
  }
}
