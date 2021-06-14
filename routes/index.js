var express = require('express');
var app = express()
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pannel Equipes' });
});

router.get('/getTeams', function(req, res, next) {
  res.send([
    {
      name:"Equipe",
      email:"equipe@team.gg",
      phoneNumber:"06 66 66 66 66",
      address:"4 rue du quatre 44444 Quatre"
    }, 
    {
      name:"Equipe2",
      email:"equipe2@team.gg",
      phoneNumber:"06 61 66 66 66",
      address:"4 rue du quatre 44444 Quatre"
    }
  ]);
});

app.use(express.static('public'));
module.exports = router;

