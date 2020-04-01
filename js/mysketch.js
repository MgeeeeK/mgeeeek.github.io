let num = 600;
let range = 20;

let ax = [];
let ay = [];

function setup() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );            
  var myCanvas = createCanvas(html.clientWidth, height - (0.12*html.clientHeight));
  myCanvas.class('backgroundsketch');

  var t = Math.random();
  for ( let i = 0; i < num; i++ ) {

    ax[i] = width * t * t;
    ay[i] = height * t * t;
  }
  frameRate(10);
}
function mouseClicked() {
  
  for ( let i = 0; i < num; i++ ) {
      ax[i] = mouseX;
      ay[i] = mouseY;
    }
}

function draw() {
  var co =  window.getComputedStyle( document.body ,null).getPropertyValue('background-color').split("(")[1].split(")")[0];
  co = parseInt(co.slice(0, co.indexOf(',')));
  background(co);

  // Shift all elements 1 place to the left
  for ( let i = 1; i < num; i++ ) {
    ax[i - 1] = ax[i];
    ay[i - 1] = ay[i];
  }

  // Put a new value at the end of the array
  ax[num - 1] += random(-(range), range);
  ay[num - 1] += random(-(range), range);

  // Constrain all points to the screen
  ax[num - 1] = constrain(ax[num - 1], 0, width);
  ay[num - 1] = constrain(ay[num - 1], 0, height);

  // Draw a line connecting the points
  for ( let j = 1; j < num; j++ ) {
    if (co < 204) var val = j / num * 204.0 + co;
    else if (co > 204) var val = (num-j) / num * co;
    stroke(val);
    line(ax[j - 1], ay[j - 1], ax[j], ay[j]);
  }
}


function windowResized(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  resizeCanvas(w, h);
}

window.addEventListener('resize',function(){
  document.body.style['overflow-x'] = 'hidden';
  document.body.style['overflow-y'] = 'auto';
});