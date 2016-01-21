
// setup webgl renderer and add varibles

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { transparent: true, antialias: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container(interactive);

var interactive = true;

// multiple graphics as textures option 

var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);

// instantiate wave variables and config options 

var lines = new PIXI.Graphics();
    w = window.innerWidth;
    h = window.innerHeight;
    tick = 0;
    points = [],
    opt = {
		count: 4,
		range: {
			x: Math.floor(Math.random()),
			y: 100
		},
		speed: {
			min: 60,
			max: 70
		},
		duration: 400,
		strokeColor: '#FFF',
		level: 0.9,
		curved: true
    };
    rand = function(min, max){
        return Math.floor( (Math.random() * (max - min + 1) ) + min);
    };
    ease = function (t, b, c, d) {
	    if ((t/=d/2) < 1) return c/2*t*t + b;
	    return -c/2 * ((--t)*(t-2) - 1) + b;
    };

// color variables

var level1 = ["0xa1c3d1",
				"0xf172a1",
				"0xad2e95",
				"0xb39bc8",
				"0xe64398",
				"0xa1c3d1",
				"0xf172a1",
				"0xad2e95",
				"0xb39bc8",
				"0xe64398"];

	level2 = ["0xb39bc8",
				"0xad2e95",
				"0xf172a1",
				"0x1f3463",
				"0xe64398",
				"0xb39bc8",
				"0xad2e95",
				"0xe64398",
				"0x1f3463"];

	level3 = ["0xf274a0",
				"0x4f3850",
				"0xb39bc8",
				"0xe64398",
				"0xad2e95",
				"0x4f3850",
				"0xed3da4",
				"0xf274a0",
				"0xad2e95",
				"0xb39bc8"];

	// bgcolor = document.body.style.background = "#a1c3d1";

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

// setup waves as PIXI Graphics 
// startPoint defines Y axis start point
// counter should be between 4-10
// color defined by '0xFF00FF' style value

var renderLines = function(startPoint, rangeVariation, horizontalVariation, color) {

	var pointCount = points.length;
 	lines.moveTo(points[0].x, points[0].y);
	lines.lineStyle(rangeVariation * 10, color, 1);

	var i;
	for (i = 0; i < pointCount - 1; i++) {


		var c = points[i].x + (horizontalVariation * 10);
		var d = points[i].y + startPoint;
		var e = (points[i].x + points[i + 1].x) / 2;
		var f = (points[i].y + points[i + 1].y) / 2 + startPoint;

		lines.bezierCurveTo(points[i].x, points[i].y + startPoint, 
							c, d,
							e, f);
	};

	stage.addChild(lines);

};


// clear previous wave

var clear = function(){
	lines.clear();
};

// draw stage onto canvas

function pack(colorPack, color) {
	document.body.style.background = color;

	renderLines(100, 16, 5, colorPack[1]);
	renderLines(250, 16, 2, colorPack[2]);
	renderLines(400, 16, 7, colorPack[3]);
	renderLines(550, 16, 4, colorPack[4]);
	renderLines(700, 16, 8, colorPack[5]);
	renderLines(850, 16, 10, colorPack[6]);
	renderLines(1000, 16, 9, colorPack[7]);
	renderLines(1150, 16, 9, colorPack[8]);
};

function draw() {

	renderer.render(stage);
	requestAnimationFrame(draw);
	clear();
	// renderLines();
	console.log(tick);
	pack(level1, "#a1c3d1");

};

function changeColor(level) {

	renderer.render(stage);
	requestAnimationFrame(changeColor);
	clear();
	if (level === level2) {
		pack(level2, "#b39bc8");
	} else {
		pack(level3, "#f274a0");
	}
};

function move() {
	renderer.render(stage);
	if (tick < opt.duration) {
		requestAnimationFrame(move);
		updatePoints();
		tick++;
	};
	// clear();
	console.log(tick);
};

function reset() {
	tick = 0;
}

var i = opt.count + 2;
var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
while(i--){
	points.push(new Point({
		x: (spacing * (i - 1)) - opt.range.x,
		y: h - (h * opt.level)
	}));
};

// begin!

draw();

//


