

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { transparent: false, antialias: true });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container(interactive);

var interactive = true;

var texture = new PIXI.RenderTexture(renderer, window.innerWidth, window.innerHeight);

var lines = new PIXI.Graphics();

