const assert = require("assert");
// Import MongoClient
const client = require("mongodb").MongoClient;

let databaseUrl = 'mongodb://localhost/ContactsManagerDb'
let _db;
module.exports = {
    getDb,
    initDb
};


function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!");
        return callback(null, _db);
    }

client.connect(databaseUrl, connected);
function connected(err, db) {
        if (err) {
            return callback(err);
        }
        console.log("DB initialized - connected to: " + databaseUrl);
        _db = db;
        return callback(null, _db);
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.");
    return _db;
}