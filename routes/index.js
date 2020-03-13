var express = require('express');
var router = express.Router();
var mq = require("../mq_utils");
var controller = require("../controllers/smile-controller")
var Smile = require("../models/smile-model")

// Add smile to rabbitmq
router.post('/add-expression', function (req, res, next) {
  message = {
    time: req.body.time,
    video_url: req.body.video_url,
    username: req.body.username,
    expression: req.body.expression,
    sent_time:req.body.sent_time,
  }
  mq.publishToQueue(message)
  res.send({ message: 'Smile Registered' });
});

router.get('/all-smiles', controller.findAll);

router.get('/recent-expressions', controller.recent);

function sortByProp(data, prop) {
  return new Map([...data.entries()].sort((a, b) => a[1][prop] > b[1][prop]));
};

router.get('/recent-expressions-and-messages', function (req, res, next) {
  Smile.find().sort({ $natural: -1 }).limit(25)
    .then(smiles => {
      smiles = smiles.reverse();
      messages = mq.MESSAGES
      sm_list = smiles.concat(messages)
      sm_list = sm_list.sort(function(a,b) {return a.sent_time - b.sent_time});
      res.send({ sm_list })
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
router.get('/', function (req, res, next) {
  res.render('view', { title: 'Express' });
});

/* GET temp page. */
router.get('/temp', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
