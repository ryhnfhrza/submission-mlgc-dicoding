const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

const savePrediction = async (data) => {
  const collection = firestore.collection('predictions');
  await collection.doc(data.id).set(data);
};

const getAllPredictions = async () => {
  const collection = firestore.collection('predictions');
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({ id: doc.id, history: doc.data() }));
};

module.exports = { savePrediction, getAllPredictions };
