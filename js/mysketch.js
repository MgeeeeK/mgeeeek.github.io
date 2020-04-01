let t = 0; // time variable

function setup() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );            
  var myCanvas = createCanvas(html.clientWidth, height);
  myCanvas.class('backgroundsketch');
  noStroke();
  fill(242, 80, 86);
}

function draw() {
  var co =  window.getComputedStyle( document.body ,null).getPropertyValue('background-color').split("(")[1].split(")")[0];
  co = parseInt(co.slice(0, co.indexOf(',')));
  background(co); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 200) {
      for (let y = 0; y <= height; y = y + 150) {
        // starting point of each circle depends on mouse position

        const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
        const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
        // and also varies based on the particle's location
        const angle = xAngle * (x / width) + yAngle * (y / height);

        // each particle moves in a circle
        const myX = x + 20 * cos(2 * PI * t + angle);
        const myY = y + 20 * sin(2 * PI * t + angle);

        ellipse(myX, myY, 5); // draw particle
      }
  }

  t = t + 0.005; // update time
}

function windowResized(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  resizeCanvas(w, h);
}

window.addEventListener('resize',function(){
  document.body.style['overflow-x'] = 'hidden';
});
