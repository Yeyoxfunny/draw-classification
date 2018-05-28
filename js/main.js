const TOTAL_IMAGES = 1000;
const IMAGE_PIXELS_NUMBER = 784;
const TRAINING_IMAGES_NUMBER = 800;

const CAT = 0;
const RAINBOW = 1;
const TRAIN = 2;

let catsData;
let rainbowsData;
let trainsData;

let neuralNetwork;

function preload() {
   catsData = loadBytes('data/cats1000.bin');
   rainbowsData = loadBytes('data/rainbows1000.bin');
   trainsData = loadBytes('data/trains1000.bin');
}

function setup() {
   const canvas = createCanvas(280, 280);
   canvas.parent("draw-board");
   background(255);
   const cats = prepareData(catsData, CAT);
   const rainbows = prepareData(rainbowsData, RAINBOW);
   const trains = prepareData(trainsData, TRAIN);

   neuralNetwork = new NeuralNetwork(IMAGE_PIXELS_NUMBER, 64, 3);

   const training = [...cats.training, ...rainbows.training, ...trains.training];
   const testing = [...cats.testing, ...rainbows.testing, ...trains.testing];
   
   const trainButton = select('#train');
   trainButton.mousePressed(() => {
      $('#activity-indicator').modal('show');
      setTimeout(() => {
         trainNeural(training);
         $('#activity-indicator').modal('hide');
      }, 500);
   });

   const guessButton = select('#guess');
   guessButton.mousePressed(() => {
      const inputs = [];
      let img = get();
      img.resize(28, 28);
      img.loadPixels();
      const classification = guessDraw(img);
      $('#draw-result').text('Has dibujado: ' + classification);
   });

   select('#clear').mousePressed(() => {
      $('#draw-result').text('');
      background(255);
   });
}

function draw() {
   strokeWeight(8);
   stroke(0);
   if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
   }
}
