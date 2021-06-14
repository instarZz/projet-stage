var express = require('express');
var app = express()
var router = express.Router();
const db = [
  {
    id:1,
    name:"Equipe44",
    email:"equipe@team.gg",
    phoneNumber:"06 66 66 66 66",
    address:"4 rue du quatre 44444 Quatre"
  }, 
  {
    id:2,
    name:"Equipe2",
    email:"equipe2@team.gg",
    phoneNumber:"06 61 66 66 66",
    address:"4 rue du quatre 44444 Quatre"
  }
];

/* GET home page. */
router.get('/', function(req, res, next) {
  const teamsData = getTeams();
  res.render('index', 
  { 
    title: 'Pannel Equipes',
    teamData: teamsData, 
  });
});

router.get('/getTeams', function(req, res, next) {
  res.send(getTeams());
});

function getTeams() {
  return db;
}

router.get('/getTeam', function(req, res, next) {
  const teamId = req.query.teamId;
  res.send(getTeam(teamId));
});

function getTeam() {
  
}

app.use(express.static('public'));
module.exports = router;

