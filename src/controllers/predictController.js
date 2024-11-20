const { performPrediction, fetchHistory } = require('../services/predictService');

const handlePrediction = async (req, res, next) => {
  try {
    const file = req.file;
    const result = await performPrediction(file);
    res.status(201).json({
      status: 'success',
      message: 'Model is predicted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPredictionHistory = async (req, res, next) => {
  try {
    const history = await fetchHistory();
    res.status(200).json({
      status: 'success',
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handlePrediction, getPredictionHistory };
