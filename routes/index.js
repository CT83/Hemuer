var express = require('express');
var router = express.Router();
var mq = require("../mq_utils");
var controller = require("../controllers/smile-controller")
var Smile = require("../models/smile-model")
var uuid = require('uuid/v4')


// Add smile to rabbitmq
router.post('/add-expression', function (req, res, next) {
  message = {
    time: req.body.time,
    video_url: req.body.video_url,
    username: req.body.username,
    expression: req.body.expression,
    sent_time: req.body.sent_time,
  }
  if (message.time == 0) {
    res.send({ message: 'Expressions at 0 are not recorded' });
  } else {
    mq.publishToQueue(message)
    res.send({ message: 'Smile Registered' });
  }
});

router.get('/all-expressions', controller.findAll);

router.get('/recent-expressions', controller.recent);

function sortByProp(data, prop) {
  return new Map([...data.entries()].sort((a, b) => a[1][prop] > b[1][prop]));
};

router.get('/recent-expressions-and-messages', function (req, res, next) {
  Smile.find().sort({ $natural: -1 }).limit(6)
    .then(smiles => {
      smiles = smiles.reverse();
      messages = mq.MESSAGES
      sm_list = smiles.concat(messages)
      sm_list = sm_list.sort(function (a, b) { return a.sent_time - b.sent_time });
      res.send({ data: sm_list })
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data."
      });
    });

});


// Add message to queue
router.post('/messages', function (req, res, next) {
  message = {
    username: req.body.username,
    message: req.body.message,
    sent_time: req.body.sent_time,
    _id: uuid(),
  }
  mq.publishMessageToQueue(message)
  res.send({ message: 'Message Sent!' });
});

// Get messages
router.get('/messages', function (req, res, next) {
  console.log(mq.MESSAGES)
  res.send({ messages: mq.MESSAGES });
});


/* GET home page. */
router.get('/reset-messages', function (req, res, next) {
  mq.MESSAGES = [];
  res.send("Messages Reset!");
});

/* GET home page. */
router.get('/', function (req, res, next) {
  video_id =
    res.render('view', { title: 'Home', video_id: "35_FVzA0XU0" });
});

/* GET temp page. */
router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});
/* GET temp page. */
router.get('/stats', function (req, res, next) {
  res.render('stats', { title: 'Stats' });
});

module.exports = router;
