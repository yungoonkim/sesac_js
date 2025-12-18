const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)", (err)=> {
    if(err){
        return console.error('테이블 생성 오류입니다.');
    }

    db.run("INSERT INTO users VALUES('id001', 'user1')", (err) => {

        if(err){
            console.error('데이터 삽입 실패');
        }
        db.each("SELECT * FROM users", (err, row) => {
            if(err){
                return console.error('데이터를 가져오는데 실패했습니다.');
            }
            console.log('조회된 메세지: ', row);
            // console.log('조회된 메세지: ', row.name);
        });
        //죄회가 완료된 다음에 닫아야함..
        db.close((err) => {
            if(err){
                return console.error('데이터 베이스 종료에 실패');
            }

            console.log('데이터베이스와 연결을 종료합니다.');
        });
    });

});







