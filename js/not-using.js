



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

// renderShapes fills area of shapes instead of rendering lines like renderLines
// ex usage: 
	// renderShapes(100, 0, 5, 0xee73a1);
	// renderShapes(220, 200, 12, 0xa2c3d0);
	// renderShapes(355, 0, 7, 0x59a0ef);
	// renderShapes(433, 0, 1, 0xe34697);

var renderShapes = function(startPoint, rangeVariation, horizontalVariation, color) {

	var pointCount = points.length;
 	lines.moveTo(points[0].x, points[0].y);
	lines.beginFill(color);  

	var i;
	for (i = 0; i < pointCount - 1; i++) {

		var c = points[i].x + (horizontalVariation * 10);
		var d = points[i].y + startPoint;
		var e = (points[i].x + points[i + 1].x) / 2 + (horizontalVariation * 10);
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