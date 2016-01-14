

// setup webgl renderer and add varibles

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0xFFC2FF, antialias: true });
document.body.appendChild(renderer.view);

var interactive = true;
var stage = new PIXI.Container(interactive);
renderer.render(stage);

var waves = new PIXI.Graphics(),
    w = window.innerWidth;
    h = window.innerHeight;
    tick = 0;
    points = [],
    opt = {
		count: 6,
		range: {
			x: 50,
			y: 300
		},
		speed: {
			min: 20,
			max: 30
		},
		duration: 100,
		strokeColor: '#FFF',
		level: .80,
		curved: true
    };
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };
    ease = function (t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    };

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
	this.speed = rand(opt.speed.min, opt.speed.max);
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
		var d = this.speed;
		this.y = ease(t, b, c, d);

		b = this.initialX;
		c = this.targetX - this.initialX;
		d = this.speed;
		this.x = ease(t, b, c, d);

		this.tick++;
	}
};

var updatePoints = function(){
	var i = points.length;
	while(i-- && tick < opt.duration){
		points[i].update();
	};
	return i;
};

//





// setup waves as PIXI Graphics NEED TO UPDATE TO TEXTURE FOR SMOOTH LINES 
// startPoint defines Y axis start point
// counter should be between 4-10
// color defined by '0xFF00FF' style value

var renderShapes = function(startPoint, rangeVariation, horizontalVariation, color) {

	var pointCount = points.length;
 	waves.moveTo(points[0].x, points[0].y);
	waves.beginFill(color);  

	var i;
	for (i = 0; i < pointCount - 1; i++) {

		var c = points[i].x + (horizontalVariation * 10);
		var d = points[i].y + startPoint;
		var e = (points[i].x + points[i + 1].x) / 2;
		var f = (points[i].y + points[i + 1].y) / 2 + startPoint;

		waves.bezierCurveTo(points[i].x, points[i].y + startPoint, 
							c, d,
							e, f);
	};

	waves.lineTo(-opt.range.x, h);
	waves.lineTo(w + opt.range.x, h);
	// waves.endFill(); this was causing glitchiness at ends of lines i THINK 

	stage.addChild(waves);

};

//


// clear previous wave

var clear = function(){
	waves.clear();
};

//


// draw stage onto canvas

function draw() {
	renderer.render(stage);
	requestAnimationFrame(draw);
	clear();
	renderShapes(0, 100, 10, 0xba95c6);
	renderShapes(100, 0, 5, 0xeb3099);
	renderShapes(220, 200, 12, 0xf45da3);
	renderShapes(355, 0, 7, 0x5b415c);
	renderShapes(533, 0, 1, 0xb63a9c);
};

function move() {
	renderer.render(stage);
	if (tick < opt.duration) {
		requestAnimationFrame(move);
		updatePoints();
		tick++;
	};
	clear();
	console.log(tick);
};

function erase() {
	clear();
	renderer.render(stage);
	requestAnimationFrame(draw);
};

var i = opt.count + 2;
var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
while(i--){
	points.push(new Point({
		x: (spacing * (i - 1)) - opt.range.x,
		y: h - (h * opt.level)
	}));
};

// var i = opt.count + 2;
// var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
// while(i--){
// 	points.push(new Point({
// 		x: (spacing * (i - 1)) - opt.range.x,
// 		y: h - (h * opt.level)
// 	}));
// };

//


