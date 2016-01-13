

// setup webgl renderer and add varibles

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0xFFC2FF, antialias: true });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container;

var waves = new PIXI.Graphics(),
    w = window.innerWidth;
    h = window.innerHeight;
    // rand = Math.random(); 
    pi = Math.PI;
    sin = Math.sin; 
    duration = 2;
    tick = 0;
    x = 0;
    points = [],
    opt = {
      count: 5,
      range: {
        x: 150,
        y: 250
      },
      duration: {
        min: 40,
        max: 60
      },
      thickness: 20,
      strokeColor: '#FFF',
      level: .65,
      curved: true
    };
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };
    ease = function (t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    };

	waves.lineJoin ='round';
	waves.lineWidth = opt.thickness;
	waves.strokeStyle = opt.strokeColor;

// 

// create points function to create animation function 


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



//



// setup waves as PIXI Graphics NEED TO UPDATE TO TEXTURE FOR SMOOTH LINES 
// color defined by '0xFF00FF' style value

var renderShapes = function(start, color) {

	var pointCount = points.length;
 	waves.moveTo(points[0].x, points[0].y);
	waves.beginFill(color);  

	var i;
	for (i = 0; i < pointCount - 1; i++) {
		var c = (points[i].x + points[i + 1].x) / 2;
		var d = (points[i].y + points[i + 1].y) / 2;
		waves.quadraticCurveTo(points[i].x, points[i].y + start, c, d + start);
	}

	waves.lineTo(-opt.range.x - opt.thickness, h + opt.thickness);
	waves.lineTo(w + opt.range.x + opt.thickness, h + opt.thickness);

	waves.endFill();

	stage.addChild(waves);

};


//


// clear previous wave

var clear = function(){
	waves.clear();
};

//



// draw stage onto canvas


var draw = function() {
	requestAnimationFrame(draw);
	renderer.render(stage);
	tick++;
	updatePoints();
	clear();
	renderShapes(0, 0xFF00FF);
	renderShapes(150, 0x9FFFFF);
	renderShapes(300, 0xCF9FFF);
	renderShapes(450, 0x9FFF9F);
};


var i = opt.count + 2;
var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
while(i--){
	points.push(new Point({
		x: (spacing * (i - 1)) - opt.range.x,
		y: h - (h * opt.level)
	}));
};

draw();

//

