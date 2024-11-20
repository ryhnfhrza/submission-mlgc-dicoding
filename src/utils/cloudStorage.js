const { Storage } = require('@google-cloud/storage');
const tf = require('@tensorflow/tfjs-node');

const bucketName = 'model-skin-detection';
const modelPath = 'model-directory/model.json';

const uploadToCloudStorage = async (file) => {
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(file.originalname);

  await blob.save(file.buffer);
  return `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
};

const loadModel = async () => {
  const modelUrl = `https://storage.googleapis.com/${bucketName}/${modelPath}`;
  return await tf.loadGraphModel(modelUrl);
};

const inferImage = async (model, image) => {
  try {
    const tensor = tf.node
      .decodeImage(image.buffer)
      .resizeBilinear([224, 224])
      .expandDims();

    const prediction = model.predict(tensor).dataSync()[0];
    return prediction;
  } catch (err) {
    const error = new Error('Terjadi kesalahan dalam melakukan prediksi');
    error.originalMessage = err.message;
    error.statusCode = 400;
    throw error;
  }
};

module.exports = { uploadToCloudStorage, loadModel, inferImage };
