var express = require('express');
var router = express.Router();
const Smile = require('../models/smile-model');
var mq = require("../mq_utils");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/view', function (req, res, next) {
  res.render('view', { title: 'Express' });
});

// Registers smiles
router.post('/register-smile', function (req, res, next) {
  // Validate request
  console.log(req.body)
  if (!req.body.time || !req.body.video_url || !req.body.username || !req.body.expression) {
    return res.status(400).send({
      message: "Request Validation Failed! Some fields are empty!"
    });
  }

  // Create a Smile
  const smile = new Smile({
    time: req.body.time,
    video_url: req.body.video_url,
    username: req.body.username,
    expression: req.body.expression,
  });

  // Save Survey in the database
  smile.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Survey."
      });
    });
  console.log("Created new smile!");
});

// Add smile to rabbitmq
router.post('/add-smile-to-queue', function (req, res, next) {
  message = {
    time: req.body.time,
    video_url: req.body.video_url,
    username: req.body.username,
    expression: req.body.expression,
  }
  mq.publishToQueue(message)
  res.send({ message: 'Smile Registered' });
});

router.get('/all-smiles', function (req, res, next) {
  Smile.find()
    .then(smiles => {
      console.log("Fetched Smiles:" + smiles);
      res.send(smiles);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });
});

module.exports = router;
