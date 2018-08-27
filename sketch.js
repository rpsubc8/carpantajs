var slider_volumen_out;
var slider_volumen_in;
var slider_squeltch;
var slider_duration_silence;
var slider_delay_relay;
var slider_duration;

var slider_vol_before=0;
var slider_vol_now=0;

var global_mic;
var global_record_sound;
var global_recorder;

//Lenguaje
var cad_slider_volumen_out='Salida';
var cad_slider_volumen_in='Entrada';
var cad_slider_squeltch='squeltch';
var cad_slider_duration_silence='Silencio';
var cad_slider_delay_relay='Espera';
var cad_slider_duration='Duracion';

function Select_language(language)
{
 if (language=='spanish')
 {
  cad_slider_volumen_out='Salida';
  cad_slider_volumen_in='Entrada';
  cad_slider_squeltch='squeltch';
  cad_slider_duration_silence='Silencio';
  cad_slider_delay_relay='Espera';
  cad_slider_duration='Duracion';
 }
 else
 {
  cad_slider_volumen_out='Output';
  cad_slider_volumen_in='Input';
  cad_slider_squeltch='Squeltch';
  cad_slider_duration_silence='Silent';
  cad_slider_delay_relay='Delay';
  cad_slider_duration='Duration';
 }
}

function Create_sliders()
{  
 var x_ini= 210;
 var aux_width= displayWidth-x_ini;
 aux_width=aux_width-50+'px';
 slider_volumen_out = createSlider(20, 100, 100); //Output
 slider_volumen_out.position(x_ini, 20); 
 //slider_volumen_out.style('width', '200px');
 slider_volumen_out.style('width', aux_width); 
 slider_volumen_in = createSlider(20, 100, 100); //Input
 slider_volumen_in.position(x_ini, 60);
 slider_volumen_in.style('width', aux_width);
 slider_squeltch = createSlider(20, 100, 100); //slider_squeltch
 slider_squeltch.position(x_ini, 100);
 slider_squeltch.style('width', aux_width);
 slider_duration_silence = createSlider(50, 1000, 100); //slider_silence
 slider_duration_silence.position(x_ini, 140);
 slider_duration_silence.style('width', aux_width);
 slider_delay_relay = createSlider(0, 1000, 100); //slider_delay
 slider_delay_relay.position(x_ini, 180);
 slider_delay_relay.style('width', aux_width);
 slider_duration = createSlider(5, 30, 100); //slider_duration
 slider_duration.position(x_ini, 220);
 slider_duration.style('width', aux_width);
}

function Show_Sliders_Text()
{
 textSize(32);
 var x_ini= 10;
 var cad_aux= cad_slider_volumen_out+'('+slider_volumen_out.value()+'db)';
 var aux_width= displayWidth-20-x_ini;
 var aux_height= 32;
 stroke(255); 
 fill(128);
 rect(0, 0, aux_width, aux_height+8, 20);
 stroke(240);
 fill(0);
 text(cad_aux, 10, 30);
 //fill(0, 102, 153);
 cad_aux= cad_slider_volumen_in+'('+slider_volumen_in.value()+'db)';
 text(cad_aux, 10, 70);
 //fill(0, 102, 153, 51);
 cad_aux= cad_slider_squeltch+'('+slider_squeltch.value()+'%)';
 text(cad_aux, 10, 110);
 cad_aux= cad_slider_duration_silence+'('+slider_duration_silence.value()+'ms)'; 
 text(cad_aux, 10, 150);
 cad_aux= cad_slider_delay_relay+'('+slider_delay_relay.value()+'ms)';
 text(cad_aux, 10, 190);
 cad_aux= cad_slider_duration+'('+slider_duration.value()+'\'\')';
 text(cad_aux, 10, 230);
 
 // stroke(0);
//quad(38, 31, 86, 20, 69, 63, 30, 76);
}



function detect_change_input_event()
{
 slider_vol_now=slider_volumen_in.value();
 if (slider_vol_now!=slider_vol_before)
 {
  slider_vol_before=slider_vol_now;
  global_mic.amp(slider_vol_before/100);
 }
}

function detect_change_all_event()
{
 detect_change_input_event();
}

function setup() {
  //createCanvas(710, 400);
  createCanvas(displayWidth, displayHeight);

  // Create an Audio input
  global_mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  global_mic.start();
  
  global_recorder= new p5.SoundRecorder()
  global_recorder.setInput(global_mic);
  
  global_soundFile = new p5.SoundFile();
  
  Select_language('spanish');  
  Create_sliders();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = global_mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  //var h = map(vol, 0, 1, height, 0);
  //ellipse(width/2, h - 25, 50+(Math.random()*10), 50);
  
  rect(10, 250, 10+(vol*1000), 20);
  
  Show_Sliders_Text();
  detect_change_all_event();
  
  // Eveant handler for keydown
document.body.addEventListener('keydown', function(e){}, true);

// Create new event
var e = document.createEvent('KeyboardEvent');
// Init key event
e.initKeyEvent('keydown', true, true, window, false, false, false, false, 13, 0);
// Dispatch event into document
document.body.dispatchEvent(e);
}