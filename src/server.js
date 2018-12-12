var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var admin = require('firebase-admin');
var serviceAccount = require('../indoor-3d8ff-firebase-adminsdk-ypvcs-ce3ab112a6.json');
var port = process.env.PORT || 8081;        // set our port
var router = express.Router();              // get an instance of the express Router

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://indoor-3d8ff.firebaseio.com'
});

// Get a database reference to our robot
var db = admin.database();
var ref = db.ref('/robots');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.route('/robots/:robot_id')
  .put(function(req, res) {
    var robotRef = ref.child(req.params.robot_id);
    if (robotRef) {
      robotRef.update(req.body, (err) => {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Robot updated' });
      });
    } else {
      res.json({ message: 'Robot ref isn\'t found' });
    }
  });

// All our REST calls will be prefix with '/api'
app.use('/api', router);

// Start the server
app.listen(port);

console.log('Server listen on port ' + port);
