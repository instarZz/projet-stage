var express = require('express');
var app = express();
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbName = 'db/map_admin.db';

async function getTeam(teamId) {
  const result = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM Teams WHERE id = $id', {
      $id : teamId
    }, (err, data)=>{
      resolve(data);
    });
  });
  return result;
}

async function getTeams() {
  const result = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM Teams', (err, data) => {
      resolve(data);
    });
  });
  return result;
};

/* BDD */

app.use(express.static('public'));
module.exports = router;

const db = new sqlite3.Database(dbName, err => {
  if(err)
  throw err
  console.log('Database stated on ' + dbName);
});

/* ROUTE */

router.get('/',async function(req, res, next) {
  const teamsData = await getTeams();console.log(teamsData);
  res.render('index', 
  { 
    title: 'Pannel Equipes',
    teamsData: teamsData, 
  });
});

router.get('/getTeam',async function(req, res, next) {
  const teamId = req.query.id,
  teamData = await getTeam(teamId);
  res.send(teamData);
  
});

router.post('/deleteTeam', async function(req, res, next) {
  const data = req.body,
  params = {
    $id: data.id,
    $deletedAt: new Date().toISOString(),
  };
  await new Promise((resolve, reject) => {
    db.run('UPDATE Teams SET deleted_at = $deletedAt WHERE id = $id', params, (err)=>{
      resolve();
    });
  });
  const teamsData = await getTeams();
  res.render('common/_table.twig', {teamsData: teamsData});
});

router.post('/addTeam',async function(req, res, next) {
  const data = req.body,
  params = {
    $name: data.name,
    $address: data.address,
    $phoneNumber: data.phone_number,
    $email: data.email,
  };
  await new Promise((resolve, reject) => {
    db.run('INSERT INTO Teams (name, email, phone_number, address) VALUES ($name, $email, $phoneNumber, $address)', params, (err)=>{
              if(err === null){
                resolve();
              } else {
                reject(err);
              }
            });
  });
  const teamsData = await getTeams();
  res.render('common/_table.twig', 
  { 
    teamsData: teamsData, 
  });
});

router.post('/editTeam', async function(req, res, next) {
  const data = req.body,
  params = {
    $id: data.id,
    $name: data.name,
    $address: data.address,
    $phoneNumber: data.phone_number,
    $email: data.email,
  };
  
  await new Promise((resolve, reject) => {
    db.run(`UPDATE Teams 
            SET name = $name, address = $address, phone_number = $phoneNumber, email = $email
            WHERE id = $id `, params, (err)=>{
              if(err === null){
                resolve();
              } else {
                reject(err);
              }
            });
  });
  const teamsData = await getTeams();
  res.render('common/_table.twig', 
  { 
    teamsData: teamsData, 
  });
});