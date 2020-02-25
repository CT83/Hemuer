var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register-smile', function (req, res, next) {
  res.send({ message: 'Smile Registered' });
});

router.get('/recent-smiles', function (req, res, next) {

  res.send({ message: 'Items' });
});

module.exports = router;
