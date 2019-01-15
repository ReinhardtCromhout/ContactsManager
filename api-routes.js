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
            email: newRegistration.email
        })
        .toArray(function (err, result) {
            console.log(result)
            console.log(isEmptyObject(result))
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

/*
    TODO Add your endpoints here
*/

// Export API routes
module.exports = router;



function isEmptyObject(obj) {
    return !Object.keys(obj).length;
  }