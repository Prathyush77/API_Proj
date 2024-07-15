const tourController = require('./../controllers/tourcontroller');
const authController = require('./../controllers/authController');

const express = require('express');
const fs = require('fs');

const router = express.Router();

// router.param('id', tourController.checkId);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
