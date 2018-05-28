// Entrenar la neurona acerca de los dibujos
function trainNeural(training) {
   // Randomizar el arreglo de los dibujos
   shuffle(training, true);

   for (let i = 0; i < training.length; i++) {
      let data = training[i];
      // Convertir pixel a un valor que se encuentra entre 0 a 1
      let inputs = Array.from(data).map(x => x / 255);
      let label = training[i].label;

      // Valores de salida
      let targets = [0, 0, 0];
      targets[label] = 1;
      neuralNetwork.train(inputs, targets);
   }
   console.log('Training Finished');
}

function testAll(testing) {
   let correct = 0;

   for (let i = 0; i < testing.length; i++) {
      let data = testing[i];
      // Normaliza el pixel a un valor que se encuentra entre 0 a 1
      let inputs = Array.from(data).map(x => x / 255);
      let label = testing[i].label;

      let predictions = neuralNetwork.predict(inputs);
      let classificationIndex = predictions.indexOf(max(predictions));

      if (classificationIndex === label) {
         correct++;
      }
   }
   let percent = 100 * correct / testing.length;
   return percent;
}

function guessDraw(image) {
   let inputs = [];
   for (let i = 0; i < IMAGE_PIXELS_NUMBER; i++) {
      let bright = image.pixels[i * 4];
      inputs[i] = (255 - bright) / 255;
   }
   const guess = neuralNetwork.predict(inputs);
   const classificationIndex = guess.indexOf(max(guess));

   let draw = "";
   if (classificationIndex === CAT) {
      draw = "Gato";
   } else if (classificationIndex === RAINBOW) {
      draw = "Arcoiris";
   } else if (classificationIndex === TRAIN) {
      draw = "Tren";
   }
   return draw;
}
