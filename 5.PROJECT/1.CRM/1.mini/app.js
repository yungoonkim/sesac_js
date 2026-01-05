const express = require('express');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('users.db');
const port = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));
const users = [];

//사용자 요청 페이지 전달
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/users/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'user_detail.html'));
});

app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

app.get('/orders', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orders.html'));
});

app.get('/order_items', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order_items.html'));
});

app.get('/items', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'items.html'));
});

app.get('/stores', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stores.html'));
});

app.get('/orderitem_detail/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'orderitem_detail.html'));
});

app.get('/order_detail/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order_detail.html'));
});

app.get('/store_detail/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'store_detail.html'));
});

app.get('/item_detail/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'item_detail.html'));
});


//백엔드 API 요청
app.get('/api/users', (req, res) => {
    const searchName = req.query.name || '';
    const pageNum = req.query.page || 1;
    const gender = req.query.gender || '';

    console.log('성별: ', gender);
    console.log("페이지 번호: ", pageNum);
    const itemsPerPage = 20; //고정
    // 쿼리문 offset 파라미터 추가
    const pageOffset = itemsPerPage * (pageNum - 1);
    let totalPages = 0;
    const param = [];

    // seachName이 있거나 없거나에 따라서 if else로 분기해도 되지만, 중복 코드라 하나로 통일
    // 이거 나중에 "이름/나이" 검색 등으로 확장해보기.

    //총 검색 결과 갯수 구하기
    let whereClause = 'WHERE 1=1';

    if (searchName) {
        whereClause += ' AND name LIKE ?';
        param.push(`%${searchName}%`);
    }

    if (gender) {
        whereClause += ' AND gender=?';
        param.push(gender);
    }

    const queryCount = `SELECT COUNT(*) AS count FROM users ${whereClause}`;

    db.get(queryCount, param, (err, row) => {
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);

        //여기서 왜 이거 nested 형태로 구현해야하는지 생각해보기(비동기)
        const query = `SELECT * FROM users ${whereClause} LIMIT ? OFFSET ?`;

        db.all(query, [...param, itemsPerPage, pageOffset], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
            }
            res.json({ totalCount: totalPages, data: rows });
        });

    });
});


app.get('/api/orders', (req, res) => {

    const pageNum = req.query.page || 1;
    const itemsPerPage = 20; //고정
    const pageOffset = itemsPerPage * (pageNum - 1);
    let totalPages = 0;

    const queryCount = `SELECT COUNT(*) AS count FROM orders`;
    db.get(queryCount, (err, row) => {
        console.log(row);
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);
        const query = `SELECT * FROM orders LIMIT ? OFFSET ?`;

        db.all(query, [itemsPerPage, pageOffset], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
            }
            res.json({ totalCount: totalPages, data: rows });
        });

    });
});

app.get('/api/items', (req, res) => {
    const pageNum = req.query.page || 1;
    const itemsPerPage = 20; //고정
    const pageOffset = itemsPerPage * (pageNum - 1);
    let totalPages = 0;

    const queryCount = `SELECT COUNT(*) AS count FROM items`;

    db.get(queryCount, (err, row) => {
        console.log(row);
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);
        const query = `SELECT * FROM items LIMIT ? OFFSET ?`;

        db.all(query, [itemsPerPage, pageOffset], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
            }
            res.json({ totalCount: totalPages, data: rows });
        });

    });
});

app.get('/api/stores', (req, res) => {
    const pageNum = req.query.page || 1;
    const itemsPerPage = 20; //고정
    const pageOffset = itemsPerPage * (pageNum - 1);
    let totalPages = 0;

    const queryCount = `SELECT COUNT(*) AS count FROM stores`;

    db.get(queryCount, (err, row) => {
        console.log(row);
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);
        const query = `SELECT * FROM stores LIMIT ? OFFSET ?`;

        db.all(query, [itemsPerPage, pageOffset], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
            }
            res.json({ totalCount: totalPages, data: rows });
        });

    });
});

app.get('/api/order_items', (req, res) => {
    const pageNum = req.query.page || 1;
    const itemsPerPage = 20; //고정
    const pageOffset = itemsPerPage * (pageNum - 1);
    let totalPages = 0;

    const queryCount = `SELECT COUNT(*) AS count FROM order_items`;

    db.get(queryCount, (err, row) => {
        console.log(row);
        const searchCount = row.count;
        totalPages = Math.ceil(searchCount / itemsPerPage);
        const query = `SELECT * FROM order_items LIMIT ? OFFSET ?`;

        db.all(query, [itemsPerPage, pageOffset], (err, rows) => {
            if (err) {
                console.error('사용자 조회 실패: ', err);
                return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
            }
            res.json({ totalCount: totalPages, data: rows });
        });

    });
});

app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const query = `
        SELECT 
            u.*,
            o.Id AS OrderId,
            o.OrderAt,
            s.Id AS StoreId
        FROM users u
        JOIN orders o ON o.UserId = u.Id
        JOIN stores s ON s.Id = o.StoreId
        WHERE u.Id = ?

    `;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
        }

        if (!rows) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
        }
        res.json(rows);
    });
});


app.get('/api/orderitem_detail/:id', (req, res) => {
    const orderId = req.params.id;
    const query = `
        SELECT 
            oi.*,
            i.Name AS ItemName
        FROM order_items oi
        JOIN items i ON oi.ItemId = i.Id
        WHERE oi.OrderId=?
    `;

    db.all(query, [orderId], (err, rows) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
        }

        if (!rows) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
        }
        res.json(rows);
    });
});

app.get('/api/order_detail/:id', (req, res) => {
    const orderId = req.params.id;
    console.log("order_detail 라우터");
    const query = 'SELECT * FROM orders WHERE Id=?';

    db.get(query, [orderId], (err, row) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
        }

        if (!row) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
        }
        res.json(row);
    });
});

app.get('/api/item_detail/:id', (req, res) => {
    const itemId = req.params.id;
    const query = `
       SELECT
            i.Name, i.UnitPrice,
            strftime('%Y-%m', o.OrderAt) AS Month,
            SUM(i.UnitPrice) AS TotalRevenue,
            COUNT(oi.ItemId) AS ItemCount
        FROM order_items oi
        JOIN orders o ON o.Id = oi.OrderId
        JOIN items i ON i.Id = oi.ItemId
        WHERE i.Id = ?
        GROUP BY Month
        ORDER BY Month;
    `;

    db.all(query, [itemId], (err, row) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
        }

        if (!row) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
        }
        res.json(row);
    });
});

app.get('/api/store_detail/:id', (req, res) => {
    const storeId = req.params.id;
    //const month = req.query.rev_month;

    //console.log(storeId, month);
    const query = `
       SELECT
            s.Name, s.Type, s.Address,
            strftime('%Y-%m', o.OrderAt) AS Month,
            SUM(i.UnitPrice) AS TotalRevenue,
            COUNT(o.StoreId) AS Count
        FROM orders o
        JOIN stores s ON s.Id = o.StoreId
        JOIN order_items oi ON oi.OrderId = o.Id
        JOIN items i ON i.Id = oi.ItemId
        WHERE s.Id = ?
        GROUP BY Month
        ORDER BY Month;
    `;

    db.all(query, [storeId], (err, row) => {
        if (err) {
            console.error('사용자 조회 실패: ', err);
            return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
        }

        if (!row) {
            console.error('사용자 조회 실패: ', err);
            return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
        }
        res.json(row);
    });
});

// app.get('/api/store_detail', (req, res) => {
//     console.log('/api/store_detail 라우터');
//     const month = req.query.rev_month;
//     console.log(month);
//     const storeId = req.query.id;
//     const query = `
//     SELECT
//         o.OrderAt                   AS month,
//         SUM(i.UnitPrice)            AS revenue,
//         COUNT(oi.ItemId)            AS count
//     FROM orders o
//     JOIN order_items oi ON oi.OrderId = o.Id
//     JOIN items i ON i.Id = oi.ItemId
//     WHERE o.StoreId = ?
//     AND o.OrderAt LIKE ?`;

//     db.all(query, [storeId, `${month}%`], (err, row) => {
//         if (err) {
//             console.error('사용자 조회 실패: ', err);
//             return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
//         }

//         if (!row) {
//             console.error('사용자 조회 실패: ', err);
//             return res.status(404).json({ error: '사용자가 존재하지 않습니다.' });
//         }
//         res.json(row);
//         console.log(row);
//     });
// });


app.listen(port, () => {
    console.log(`Server is ready ${port}`);
});