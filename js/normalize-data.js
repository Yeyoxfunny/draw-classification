function prepareData(data, label) {
   const drawImage = {};
   drawImage.training = [];
   drawImage.testing = [];

   for (let i = 0; i < TOTAL_IMAGES; i++) {
      // Cada imagen tiene 784 pixeles
      let offset = i * IMAGE_PIXELS_NUMBER;

      if (i < TRAINING_IMAGES_NUMBER) {
         drawImage.training[i] = data.bytes.subarray(offset, offset + IMAGE_PIXELS_NUMBER);
         drawImage.training[i].label = label;
      } else {
         drawImage.testing[i - TRAINING_IMAGES_NUMBER] = data.bytes.subarray(offset, offset + IMAGE_PIXELS_NUMBER);
         drawImage.testing[i - TRAINING_IMAGES_NUMBER].label = label;
      }
   }
   return drawImage;
}