const collectionName = "ApplicationUsers"
const databaseName = "ContactsManagerDb"
const assert = require("assert")
// Import MongoClient
const client = require("mongodb").MongoClient

let databaseUrl = 'mongodb://localhost/' + databaseName
let _db;
module.exports = {
    getDb,
    initDb,
    collectionName,
    databaseName
};

function initDb(callback) {
    if (_db) {
        console.warn("Trying to init DB again!")
        return callback(null, _db)
    }

client.connect(databaseUrl, connected)
function connected(err, db) {
        if (err) {
            return callback(err);
        }
        _db = db
        var databaseObject = db.db(databaseName)
        console.log("DB initialized - connected to: " + _db.s.url)
        databaseObject.createCollection(collectionName, function(err, res) {
            if (err) throw err;
            console.log("Collection \"" + collectionName + "\" created")
          })
        return callback(null, _db)
    }
}

function getDb() {
    assert.ok(_db, "Db has not been initialized. Please called init first.")
    return _db
}