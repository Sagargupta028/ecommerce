const ratingService = require("../services/rating.service.js");

const createRating = (req, res) => {
  try {
    const user = req.user;
    const rating = ratingService.createRating(req.body, user);
    res.status(201).send(rating);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getAllRatings = async (req, res) => {
  try {
    const productId = req.params.productId;
    const ratings = await ratingService.getProductsRating(productId);
    res.status(200).send(ratings);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { getAllRatings, createRating };
