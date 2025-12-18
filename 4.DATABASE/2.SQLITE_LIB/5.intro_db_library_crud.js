const sqlite3 = require('sqlite3').verbose();

//const db = new sqlite3.Database('simple.db'); //지금은 하드코딩 되어 있지만..

function connectDB(dbname){
    const db = new sqlite3.Database(dbname);
    return db;
}

function runQuery(query){
    return new Promise((resolve, reject) => {
        db.run(query, (err) => {
            if(err) return reject(err);
            else resolve(this);
        });
    });
}

function allQuery(query){
    return new Promise((resolve, reject) => {
        db.all(query, (err, rows) => {
            if(err) return reject(err);
            else resolve(rows);
        });
    });
}

function getQuery(){}

function eachQuery(){

}

module.exports = {
    connectDB,
    runQuery,
    allQuery
}
