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
   createCanvas(280, 280);
   background(255);
   const cats = prepareData(catsData, CAT);
   const rainbows = prepareData(rainbowsData, RAINBOW);
   const trains = prepareData(trainsData, TRAIN);

   neuralNetwork = new NeuralNetwork(IMAGE_PIXELS_NUMBER, 64, 3);

   const training = [...cats.training, ...rainbows.training, ...trains.training];
   const testing = [...cats.testing, ...rainbows.testing, ...trains.testing];
   
   const trainButton = select('#train');
   trainButton.mousePressed(() => trainNeural(training));

   const testButton = select('#test');
   testButton.mousePressed(() => {
      let percent = testAll(testing);
      console.log("Percent: " + nf(percent, 2, 2) + "%");
   });

   const guessButton = select('#guess');
   guessButton.mousePressed(() => {
      const inputs = [];
      let img = get();
      img.resize(28, 28);
      img.loadPixels();
      const classification = guessDraw(img);
      console.log(classification);
   });

   select('#clear').mousePressed(() => background(255));
}

function draw() {
   strokeWeight(8);
   stroke(0);
   if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
   }
}
