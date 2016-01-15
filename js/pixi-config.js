

// setup webgl renderer and add varibles

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0x59a0ef, antialias: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container(interactive);

var interactive = true;
renderer.render(stage);

//

// multiple graphics as textures option 

var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);
var lines = new PIXI.Graphics();

//





// color variables

var colorPack1 = ["0x59a0ef",
				  "0xee73a1",
				  "0xa2c3d0",
				  "0x59a0ef",
				  "0xe34697",
				  "0x59a0ef",
				  "0xee73a1",
				  "0xa2c3d0",
				  "0x59a0ef",
				  "0xe34697"];
var colorPack2 = ["0xb29cc7",
				  "0xab3394",
				  "0xee73a1",
				  "0x203562",
				  "0xe34697",
				  "0xb29cc7",
				  "0xab3394",
				  "0xe34697",
				  "0x203562"];
// lines.beginFill(colorPack1[1]);
// lines.moveTo(0, 200);
// lines.lineTo(200, 400);
// lines.lineTo(200, 600);
// lines.endFill();
// texture.render(lines);

// var i;
// for(var i = 0; i < 8; i++) {
// 	var waves = new PIXI.Sprite(texture);
// 	waves.position.x = Math.random() * renderer.width;
// 	waves.position.y = Math.random() * renderer.height;
// 	stage.addChild(waves);
// }

// renderer.render(stage);


//



// // instantiate wave variables and config options 

// var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);
// var waves = new PIXI.Graphics(),
    w = window.innerWidth;
    h = window.innerHeight;
    tick = 0;
    points = [],
    opt = {
		count: 5,
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
		level: .90,
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



var renderSprites = function() {

	var pointCount = points.length;
	// lines.beginFill(0x44FFFF);
	lines.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1);
	lines.moveTo(0, Math.random() * 380);

	var i;
	for (i = 0; i < pointCount - 1; i++) {
		var c = points[i].x;
		var d = points[i].y;
		var e = (points[i].x + points[i + 1].x) / 2;
		var f = (points[i].y + points[i + 1].y) / 2;

		lines.bezierCurveTo(points[i].x, points[i].y, 
							c, d,
							e, f);
	};
	// lines.endFill();
	texture.render(lines);

	var pointCount = points.length;
 	lines.moveTo(points[0].x, points[0].y);
	// lines.beginFill(color);  


	var lineSprite = new PIXI.Sprite(texture);
	lineSprite.cacheAsBitmap= true;
	stage.addChild(lineSprite);
	lineSprite.position.x = 0;
	lineSprite.position.y = Math.random() * renderer.height;
	tick++;

	return tick;

};


var renderLines = function(startPoint, rangeVariation, horizontalVariation, color) {

	var pointCount = points.length;
 	lines.moveTo(points[0].x, points[0].y);
	lines.lineStyle(rangeVariation * 10, color, 1);
	// lines.beginFill(color);  

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

	// lines.lineTo(-opt.range.x, h);
	// lines.lineTo(w + opt.range.x, h);

	// waves.endFill(); this was causing glitchiness at ends of lines i THINK 

	stage.addChild(lines);

	// var lineSprite = new PIXI.Sprite(texture);
	// lineSprite.cacheAsBitmap= true;
	// stage.addChild(lineSprite);
	// lineSprite.position.x = 0;
	// lineSprite.position.y = startPoint;

};

var renderShapes = function(startPoint, rangeVariation, horizontalVariation, color) {

	var pointCount = points.length;
 	lines.moveTo(points[0].x, points[0].y);
	lines.beginFill(color);  

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

	lines.lineTo(-opt.range.x, h);
	lines.lineTo(w + opt.range.x, h);
	// waves.endFill(); this was causing glitchiness at ends of lines i THINK 

	stage.addChild(lines);

};

//


// clear previous wave

var clear = function(){
	lines.clear();
};

//


// draw stage onto canvas

function draw() {
	renderer.render(stage);
	requestAnimationFrame(draw);
	clear();
	// renderLines();
	// console.log(tick);
	renderLines(100, 15, 5, colorPack1[1]);
	renderLines(250, 15, 2, colorPack1[2]);
	renderLines(400, 15, 7, colorPack1[3]);
	renderLines(550, 15, 1, colorPack1[4]);
	renderLines(700, 15, 1, colorPack1[5]);
	renderLines(850, 15, 1, colorPack1[6]);
	renderLines(1000, 15, 1, colorPack1[7]);

	// renderShapes(100, 0, 5, 0xee73a1);
	// renderShapes(220, 200, 12, 0xa2c3d0);
	// renderShapes(355, 0, 7, 0x59a0ef);
	// renderShapes(433, 0, 1, 0xe34697);
	// renderShapes(490, 0, 1, 0x59a0ef);
	// renderShapes(533, 0, 1, 0xee73a1);
	// renderShapes(633, 0, 1, 0xa2c3d0);
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

function changeColor() {
	renderer.render(stage);
	requestAnimationFrame(changeColor);
	clear();
	console.log("Color change");
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

// var i = opt.count + 2;
// var spacing = (w + (opt.range.x * 2)) / (opt.count-1);
// while(i--){
// 	points.push(new Point({
// 		x: (spacing * (i - 1)) - opt.range.x,
// 		y: h - (h * opt.level)
// 	}));
// };

//


