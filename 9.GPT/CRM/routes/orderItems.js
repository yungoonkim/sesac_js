const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const pageGroupSize = 10;

    // 전체 개수
    const countSql = `SELECT COUNT(*) AS total FROM order_items`;

    db.get(countSql, (err, countRow) => {
        const totalItems = countRow.total;
        const totalPages = Math.ceil(totalItems / limit);

        const startPage = Math.floor((page - 1) / pageGroupSize) * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

        const sql = `
            SELECT *
            FROM order_items
            LIMIT ? OFFSET ?
        `;

        db.all(sql, [limit, offset], (err, orderItems) => {
            res.render('order-items', {
                orderItems,
                currentPage: page,
                totalPages,
                startPage,
                endPage
            });
        });
    });
});

module.exports = router;
