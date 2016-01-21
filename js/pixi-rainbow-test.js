

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { transparent: false, antialias: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container(interactive);

var interactive = true;

var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);

var lines = new PIXI.Graphics();
var c = document.querySelector('canvas')
    w = 0, h = 0,
    
    x0 = 0, y0 = 0, x = 0, y = 0, 
    t = 0, t_step = 1/20, 
    tmp = 0, 
    
    exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt, 
    PI = Math.PI, sin = Math.sin, cos = Math.cos;


/* FUNCTIONS */
var rand = function(max, min) {
  var b = (max === 0 || max) ? max : 1, a = min || 0;
  
  return a + (b - a)*Math.random();
};

var trimUnit = function(input_str, unit) {
  return parseInt(input_str.split(unit)[0], 10);
};

var initCanvas = function() {
  var s = getComputedStyle(c);
  
  w = c.width = trimUnit(s.width, 'px');
  h = c.height = trimUnit(s.height, 'px');
};

var wave = function() {
  x0 = -1, y0 = h/2;
  
  // lines.clearRect(0, 0, w, h);
  
	tmp = pow(t, 1.75)/19; // keep computation out of loop
  
  for(x = 0; x < w; x = x + 3) {
    y =  9 * sqrt(x) * 
								sin(x/23/PI + t/3 + sin(x/29 + t)) + 
                32 * sin(t) * 
								cos(x/19 + t/7) + 
                16 * cos(t) * 
								sin(sqrt(x) + rand(3, 2)*tmp) 
								+ h/2;
    
    // lines.beginPath();
    lines.moveTo(x0, y0);
    lines.lineTo(x, y);
    // lines.lineWidth = 2;
    lines.lineStyle(2, 0xb39bc8, 1);
    // lines.stroke();

    stage.addChild(lines);
    
    x0 = x;
    y0 = y;
  };
  
  t += t_step;
  
  requestAnimationFrame(wave);

};


/* START THE MADNESS */
setTimeout(function() {
  initCanvas();
  renderer.render(stage);
  wave();
  requestAnimationFrame(wave);
  
  /* fix looks on resize */
  addEventListener('resize', initCanvas, false);
}, 15);