var sliderSquelch;
var sliderDuracion;
var sliderEspera;
var sliderVolumen;
var sliderSilencio;
var sliderVOX;

var mic;

function CrearSliders()
{
  sliderSquelch = createSlider(0, 255, 100,5);
  sliderSquelch.position(10, 10);
  sliderSquelch.style('width', '80px');
  
  sliderDuracion = createSlider(0, 255, 10,5);
  sliderDuracion.position(10, 40);
  sliderDuracion.style('width', '60px');
  
  sliderEspera = createSlider(0, 255, 10,5);
  sliderEspera.position(10, 70);
  sliderEspera.style('width', '40px');
  
  sliderVolumen = createSlider(0, 255, 10,5);
  sliderVolumen.position(10, 110);
  sliderVolumen.style('width', '40px');
  
  sliderSilencio = createSlider(0, 255, 10,5);
  sliderSilencio.position(10, 160);
  sliderSilencio.style('width', '40px');
  
  sliderVOX = createSlider(0, 255, 10,5);
  sliderVOX.position(10, 190);
  sliderVOX.style('width', '40px');
}

function setup() {
  // put setup code here
  createCanvas(640, 480);
  
  CrearSliders();
  
  mic = new p5.AudioIn()
  mic.start();
}

function draw() {
  // put drawing code here
  ellipse(50, 50, 80, 80);
  
  background(0);
  micLevel = mic.getLevel();
  ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);

}