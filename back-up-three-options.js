

var canvas = document.getElementById('c'),
    d = document.getElementById('d'),
    e = document.getElementById('e'),
    ctx = canvas.getContext('2d'),
    dtx = d.getContext('2d'),
    etx = e.getContext('2d'),

    w = canvas.width = 480,
    h = canvas.height = 900,
    cw = canvas.width = w,
    ch = canvas.height = h,
    dw = d.width = w,
    dh = d.height = h,
    ew = e.width = w,
    eh = e.height = h,

    points = [],
    tick = 0,
    opt = {
      count: 3,
      range: {
        x: 50,
        y: 250
      },
      duration: {
        min: 20,
        max: 30
      },
      thickness: 0,
      strokeColor: '#FFF',
      level: .65,
      curved: true
    },
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    },
    ease = function (t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    };

ctx.lineJoin = dtx.lineJoin = etx.lineJoin ='round';
ctx.lineWidth = dtx.lineWidth = etx.lineWidth = opt.thickness;
ctx.strokeStyle = dtx.strokeStyle = etx.strokeStyle = opt.strokeColor;

var Point = function(config){
  this.anchorX = config.x;
  this.anchorY = config.y;
  this.x = config.x;
  this.y = config.y;
  this.setTarget();  
};

Point.prototype.setTarget = function(){
  this.initialX = this.x;
  this.initialY = this.y;
  this.targetX = this.anchorX + rand(0, opt.range.x * 2) - opt.range.x;
  this.targetY = this.anchorY + rand(0, opt.range.y * 2) - opt.range.y;
  this.tick = 0;
  this.duration = rand(opt.duration.min, opt.duration.max);
}
  
Point.prototype.update = function(){
  var dx = this.targetX - this.x;
  var dy = this.targetY - this.y;
  var dist = Math.sqrt(dx * dx + dy * dy);
  
  if(Math.abs(dist) <= 0){
    this.setTarget();
  } else {       
    var t = this.tick;
    var b = this.initialY;
    var c = this.targetY - this.initialY;
    var d = this.duration;
    this.y = ease(t, b, c, d);
    
    b = this.initialX;
    c = this.targetX - this.initialX;
    d = this.duration;
    this.x = ease(t, b, c, d);
  
    this.tick++;
  }
};

var updatePoints = function(){
  var i = points.length;
  while(i--){
    points[i].update();
  };
  return i;
};


var renderShapes = function(){
  ctx.beginPath();
  dtx.beginPath();
  etx.beginPath();

  var pointCount = points.length;
  ctx.moveTo(points[0].x, points[0].y);
  dtx.moveTo(points[0].x, points[0].y); 
  etx.moveTo(points[0].x, points[0].y); 

  var i;
  for (i = 0; i < pointCount - 1; i++) {
    var c = (points[i].x + points[i + 1].x) / 2;
    var d = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    dtx.quadraticCurveTo(points[i].x, points[i].y, c, d);
    etx.quadraticCurveTo(points[i].x, points[i].y, c, d);
  }

  ctx.lineTo(-opt.range.x - opt.thickness, ch + opt.thickness);
  ctx.lineTo(cw + opt.range.x + opt.thickness, ch + opt.thickness);
  ctx.closePath();   
  ctx.fillStyle = 'hsl(' + 310 + ', 90%, 70%)';
  ctx.fill();  
  ctx.stroke();


  dtx.lineTo(-opt.range.x - opt.thickness, dh + opt.thickness);
  dtx.lineTo(dw + opt.range.x + opt.thickness, dh + opt.thickness);
 
  dtx.closePath();   
  dtx.fillStyle = 'hsl(' + 120 + ', 90%, 70%)';
  dtx.fill();  
  dtx.stroke();



  // etx.lineTo(-opt.range.x - opt.thickness, eh + opt.thickness);
  // etx.lineTo(ew + opt.range.x + opt.thickness, eh + opt.thickness);
 
  etx.closePath();   
  etx.fillStyle = 'hsl(' + 200 + ', 80%, 70%)';
  etx.fill();  
  // etx.stroke();
};

var clear = function(){
  ctx.clearRect(0, 0, cw, ch);
  dtx.clearRect(0, 0, dw, dh);
  etx.clearRect(0, 0, ew, eh);
};

var loop = function(){
  window.requestAnimFrame(loop, canvas, d, e);
  tick++;
  clear();
  updatePoints();
  renderShapes();
};

var i = opt.count + 2;
var spacing = (cw + (opt.range.x * 2)) / (opt.count-1);
while(i--){
  points.push(new Point({
    x: (spacing * (i - 1)) - opt.range.x,
    y: ch - (ch * opt.level)
  }));
}

window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

loop();