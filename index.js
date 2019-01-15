// Imports
const initDb = require("./database").initDb;
const getDb = require("./database").getDb;
let express = require('express')
let bodyParser = require('body-parser');
let apiRoutes = require("./api-routes")

// Initialize the app
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(bodyParser.json())

//  Use Api routes in the App
app.use('/', apiRoutes)

 // Setup server port
var port = process.env.PORT || 8080

//Initialise DB and start Application
 initDb(function (err) {
     app.listen(port, function (err) {
         if (err) {
             throw err
         }
         console.log("API Up and running on port " + port)
     });
});

// Send message for default URL
// app.get('/', (req, res) => res.send('Hello World with ExpressJS'));

// Endpoint to Test DB Connection
app.get('/testDbConnection', function (req, res){
    const db = getDb()
    res.send("Omegalul: " + db.s.url)
});
