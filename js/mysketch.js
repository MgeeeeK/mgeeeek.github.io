
function setup() {
  var body = document.body,
    html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );            
  var myCanvas = createCanvas(html.clientWidth, height);
  myCanvas.class('backgroundsketch');
  
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
