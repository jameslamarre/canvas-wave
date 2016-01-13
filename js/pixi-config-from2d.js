

// setup webgl renderer

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0x66FF99, antialias: true });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container;

// 



// setup graphics 



var waves = new PIXI.Graphics(),
    w = stage.width,
    h = stage.height,
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
    };;

waves.lineJoin ='round';
waves.lineWidth = opt.thickness;
waves.strokeStyle = opt.strokeColor;


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
};
  
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
	waves.drawRect();

	var pointCount = points.length;
	waves.moveTo(points[0].x, points[0].y);

	var i;
	for (i = 0; i < pointCount - 1; i++) {
		var c = (points[i].x + points[i + 1].x) / 2;
		var d = (points[i].y + points[i + 1].y) / 2;
		waves.quadraticCurveTo(points[i].x, points[i].y, c, d);
	}

	waves.lineTo(-opt.range.x - opt.thickness, h + opt.thickness);
	waves.lineTo(w + opt.range.x + opt.thickness, h + opt.thickness);
	// waves.closePath();
	waves.fillStyle = 'hsl(' + 310 + ', 90%, 70%)';
	waves.beginFill();  
	// waves.stroke();
};


var i = opt.count + 2;
var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
while(i--){
	points.push(new Point({
		x: (spacing * (i - 1)) - opt.range.x,
		y: h - (h * opt.level)
	}));
}




//



// draw stage onto canvas

function draw() {
	requestAnimationFrame(draw);
	renderer.render(stage);
  	tick++;
  	updatePoints();
	renderShapes();
}

draw();

//



