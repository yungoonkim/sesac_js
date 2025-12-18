const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

// function runQuery(query, params = []){}
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

async function do_db_working() {
    //테이블 생성
    await runQuery("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)");
    console.log('테이블이 성공적으로 생성되었습니다.');

    //데이터 삽입
    await runQuery("INSERT INTO users VALUES('id001', 'user1')");
    console.log('데이터 삽입이 성공했습니다.');

    //데이터 조회
    const rows = await allQuery('SELECT * FROM users');
    console.log('조회가 성공했습니다.');
    rows.forEach(row => console.log('조회된 메시지: ', row));
}

do_db_working();








