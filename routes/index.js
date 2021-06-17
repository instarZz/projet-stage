var express = require('express');
var app = express();
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const dbName = 'db/map_admin.db';
// const db = new sqlite3.Database(':map_admin:');

/* BDD */
let db = new sqlite3.Database(dbName, err => {
  if(err)
    throw err
  
    console.log('Database stated on ' + dbName);

    // db.run('INSERT INTO Teams(name, email, phone_number, address) VALUES($name, $email, $phone_number, $address)', {
    //   $id : 2,
    //   $name : 'Team 3',
    //   $email : 'test2@test.ez',
    //   $phone_number : '0866666666',
    //   $address : '4 rue du quatre',
    // });
    // var stmt = db.prepare('INSERT INTO Teams VALUES(?)');
    // stmt.finalize();

    // db.all('SELECT * FROM Teams', (err, data) => {
    //   if(err)
    //     throw err

      // console.log(data);
    // });
});



// db.close(err => {
//   if(err)
//     throw err; 
//     console.log('Database closed.');
// });


/* GET home page. */
router.get('/',async function(req, res, next) {
  const teamsData = await getTeams();
  res.render('index', 
  { 
    title: 'Pannel Equipes',
    teamsData: teamsData, 
  });
});

// router.get('/getTeams',async function(req, res, next) {
//   res.send();
// });

async function getTeams() {
  const result = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM Teams', (err, data) => {
      resolve(data);
    });
  });
  console.log(result);
  return result;
};
  // db.all('SELECT * FROM Teams', (err, data) => {
  //   if(err)
  //     throw err

  //   console.log(data);
  // });
  // console.log(result);
  // return result;
  



router.get('/getTeam', function(req, res, next) {
  const teamId = req.query.teamId;
  res.send(getTeam(teamId));
});

// function getTeam(teamId) {
  
// }

// function isTeam(){

// }

app.use(express.static('public'));
module.exports = router;

