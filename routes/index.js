var express = require('express');
var router = express.Router();
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

// Add message to queue
router.post('/messages', function (req, res, next) {
  message = {
    username: req.body.username,
    message: req.body.message,
  }
  mq.publishMessageToQueue(message)
  res.send({ message: 'Message Sent!' });
});

// Add message to queue
router.get('/messages', function (req, res, next) {
  console.log(mq.MESSAGES)
  res.send({ messages: mq.MESSAGES });
});


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('view', { title: 'Express' });
});

/* GET temp page. */
router.get('/temp', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
