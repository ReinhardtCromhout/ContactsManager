const collectionName = require("./database").collectionName
const databaseName = require("./database").databaseName

const getDb = require("./database").getDb

// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to this random thing I made',
    });
});

//Define the rest of the endpoints

router.post('/register', function (req, res) {
    var db = getDb();
    var databseObject = db.db(databaseName)
    var newRegistration = req.body

    databseObject.collection(collectionName)
        .find({
            email: newRegistration.Email
        })
        .toArray(function (err, result) {
            if (err) throw err
            if (isEmptyObject(result)) {
                databseObject.collection(collectionName).insertOne(newRegistration, function (err, result) {
                    if (err) throw err;
                    console.log("1 document inserted: ");
                    console.log(result)
                });
                res.statusCode = 200
                res.json({
                    message: 'User registered sucessfully',
                });
            } else {
                res.statusCode = 409
                res.json({
                    message: 'A user with this email address already exists',
                });
            }
        });
});

router.post('/login', function (req, res) { 
    var db = getDb();
    var databseObject = db.db(databaseName)
    var loginDetails = req.body

    databseObject.collection(collectionName)
        .find({
            Email: loginDetails.Email,
            Password : loginDetails.Password
        })
        .toArray(function (err, result) {
            if (err) throw err
            if (!isEmptyObject(result)) {
                res.statusCode = 200
                res.json({
                    message: 'User login sucessful',
                    User: result[0]
                });
            } else {
                res.statusCode = 404
                res.json({
                    message: 'Invalid email and password combination'                    
                });
            }
        });
});

/*
    TODO Add your endpoints here
*/

// Export API routes
module.exports = router;



function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }