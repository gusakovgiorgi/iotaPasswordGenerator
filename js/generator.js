
var cklickNumber=0;
var maxClickNumber=10;

function generate(){

  var generateButton=document.getElementById("start_generating");
  generateButton.disabled=true;
  generateButton.innerHTML="click on bubble";
  drawBubble();

}

function drawBubble(){
  var topX;
  var topY;

  var bubbleImage=document.getElementById("bubble");

  var imageWidth=bubbleImage.width;;

  var imageHeight=bubbleImage.height;

  topX=Math.abs(Math.round(Math.random()*window.innerWidth-imageWidth));
  topY=Math.abs(Math.round(Math.random()*window.innerHeight-imageHeight));


  bubbleImage.style.top=topY+"px";
  bubbleImage.style.left=topX+"px";
  bubbleImage.style.visibility="visible";
}


function bubbleClicked(e){
  console.log(e);
  cklickNumber++;
  if (cklickNumber<maxClickNumber) {
   move(cklickNumber);
   drawBubble();
 }else if (cklickNumber==maxClickNumber) {
  move(cklickNumber);
}else{
    openModalDialog();
 }
}

function move(number) {
  // first time
  if (number==1) {
      var containerMain=document.getElementById("progressbar-main-container");
      containerMain.style.visibility="visible";
      containerMain.className+="animate-when-visible";
  }

  var elem = document.getElementById("myBar"); 
  var width=number/maxClickNumber*100;
  elem.style.width = width + '%';   
  document.getElementById("progressbar-description").innerHTML = maxClickNumber-number+ " clicks remaining";
}

function openModalDialog(){
  var dialog=document.getElementById("openModal");
  dialog.style.opacity=1;
  dialog.style.pointerEvents="auto";
}

function closeModalDialog(){
  var dialog=document.getElementById("openModal");
  dialog.style.opacity=0;
  dialog.style.pointerEvents="none";
}

