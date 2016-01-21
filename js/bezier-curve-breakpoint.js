
// setup webgl 

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor: 0xFFDEFF, antialias: true });
document.body.appendChild(renderer.view);

var stage = new PIXI.Container;

var waves = new PIXI.Graphics(),
    w = window.innerWidth;
    h = window.innerHeight;
    rand = Math.random(); 
    pi = Math.PI;
    sin = Math.sin; 
    duration = 2;
    tick = 0;
    x = 0;
// 

// setup waves as PIXI Graphics NEED TO UPDATE TO TEXTURE FOR SMOOTH LINES 
// color defined by '0xFF00FF' style value

var renderShapes = function(Ymin, Ymax, color) {

	// var sine = Math.sin(x*Math.PI/180);

	waves.moveTo(0, Ymin);
	waves.beginFill(color); 
	waves.lineStyle(0, color, 1);

	waves.bezierCurveTo(rand * 620, rand * 380,
	                    rand * 620, rand * 380,
	                    w/2, Ymax);

	waves.bezierCurveTo(w/2, Ymax/2,
	                    rand * 620, rand * 380,
	                    w, Ymax);

	waves.endFill();

	// draw a rectangle to fill in space under curve
	waves.lineStyle(0, color, 1);
	waves.beginFill(color, 1);
	waves.moveTo(0, Ymin);
	waves.lineTo(w, Ymax);
	waves.lineTo(w, h);
	waves.lineTo(0, h);
	waves.endFill();


	stage.addChild(waves);

};

// clear previous wave

var clear = function(){
	waves.clear();
};

// draw stage onto canvas

function draw() {
	requestAnimationFrame(draw);
	renderer.render(stage);
	clear();
	renderShapes(h / 3, h / 4, 0xFF00FF);
	renderShapes(h / 2, h / 3, 0x9FFFFF);
	renderShapes(h, h / 3, 0xFFD2FF);
	renderShapes(h, h / 2, 0xFF9FFF);
};

draw();

//
