const { uploadToCloudStorage, loadModel, inferImage } = require('../utils/cloudStorage');
const { savePrediction, getAllPredictions } = require('../models/firestoreModel');
const { v4: uuidv4 } = require('uuid');

const performPrediction = async (file) => {
  if (!file) {
    const error = new Error('No file provided');
    error.statusCode = 400;
    throw error;
  }
  const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!validMimeTypes.includes(file.mimetype)) {
    const error = new Error('Invalid file type. Only JPEG and PNG images are allowed');
    error.statusCode = 400;
    throw error;
  }
  if (file.size > 1000000) {
    const error = new Error('Payload content length greater than maximum allowed: 1000000');
    error.status = 413;
    throw error;
  }

  const model = await loadModel();
  const prediction = await inferImage(model, file);
  const id = uuidv4();
  const createdAt = new Date().toISOString();

  const result = {
    id,
    result: prediction > 0.5 ? 'Cancer' : 'Non-cancer',
    suggestion: prediction > 0.5 ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.',
    createdAt,
  };

  await savePrediction(result);
  return result;
};

const fetchHistory = async () => {
  return await getAllPredictions();
};

module.exports = { performPrediction, fetchHistory };
