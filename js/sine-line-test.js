

// set up PIXI graphics and variables

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {backgroundColor: 0xa1c3d1, antialias: true, clearBeforeRender: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);
var lines = new PIXI.Graphics(),
    w = window.innerWidth,
    h = window.innerHeight,
     
    x = 0, y = 0, x0 = 0, y0 = 0, t = 10, speed = 1/30,
    exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt, 
    PI = Math.PI, sin = Math.sin, cos = Math.cos,

    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };

var renderLines = function(color, heightVar, variable) {

  x0 = -1000, 
  y0 = (h/heightVar)/2;

  lines.lineStyle(100, color, 1);

  for (x = 0; x < w; x = x + 3) {
    lines.moveTo(x0, y0);
    lines.lineTo(x + 10, y);
    
    y =  variable * sin(PI + t/1 + sin(x/40 + t)) + ((h/heightVar)/2);

    x0 = x;
    y0 = y;
  };

  t += speed;
  stage.addChild(lines);

};

var clear = function() {
  lines.clear();
};

function draw() {
  renderer.render(stage);
  requestAnimationFrame(draw);
  clear();
  renderLines(0xf172a1, 0.7, 6);
  renderLines(0xad2e95, 0.8, 14);
  renderLines(0xb39bc8, 0.9, 14);
};

draw();