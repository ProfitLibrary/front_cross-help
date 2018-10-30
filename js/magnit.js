var object = document.getElementById("magnit");
var area = document.getElementById("area");

function showCoords(evt){
  object.style.top = evt.clientY*0.02 + "px";
  object.style.left = evt.clientX*0.02 + "px";
}
function exitCoords(){
  object.style.top = "0px";
  object.style.left = "0px"; 
}