var express = require('express');
var router = express.Router();
var Smile = require('../models/smile-model');
var mq = require("../mq_utils");
var controller = require("../controllers/smile-controller")

// Add smile to rabbitmq
router.post('/add-expression', function (req, res, next) {
  message = {
    time: req.body.time,
    video_url: req.body.video_url,
    username: req.body.username,
    expression: req.body.expression,
  }
  mq.publishToQueue(message)
  res.send({ message: 'Smile Registered' });
});

router.get('/all-smiles', controller.findAll);

router.get('/recent-expressions', controller.recent);


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/view', function (req, res, next) {
  res.render('view', { title: 'Express' });
});

module.exports = router;
