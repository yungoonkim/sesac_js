const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/', (req, res) => {
    // ===============================
    // 1. 페이지 기본값
    // ===============================
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const PAGE_GROUP_SIZE = 10;

    // ===============================
    // 2. SQL 쿼리
    // ===============================
    const countQuery = `
        SELECT COUNT(*) AS count
        FROM orders
    `;

    const dataQuery = `
        SELECT Id, OrderAt, StoreId, UserId
        FROM orders
        ORDER BY OrderAt DESC
        LIMIT ? OFFSET ?
    `;

    // ===============================
    // 3. 전체 개수 조회
    // ===============================
    db.get(countQuery, [], (err, countResult) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Order Count Error');
        }

        const totalCount = countResult.count;
        const totalPages = Math.ceil(totalCount / limit);

        // ===============================
        // 4. 페이지 그룹 계산
        // ===============================
        const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
        const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
        const endPage = Math.min(
            startPage + PAGE_GROUP_SIZE - 1,
            totalPages
        );

        // ===============================
        // 5. 실제 데이터 조회
        // ===============================
        db.all(dataQuery, [limit, offset], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Order Data Error');
            }

            res.render('orders', {
                orders: rows,
                currentPage: page,
                totalPages,
                startPage,
                endPage
            });
        });
    });
});

module.exports = router;
