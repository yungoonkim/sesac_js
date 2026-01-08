const express = require('express');
const router = express.Router();
const db = require('../utils/db');

router.get('/', (req, res) => {
    // ===============================
    // 1. 기본 설정
    // ===============================
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const searchName = req.query.name || '';
    const gender = req.query.gender || '';

    // 페이지 그룹 설정 (10개씩)
    const PAGE_GROUP_SIZE = 10;

    // ===============================
    // 2. SQL 기본 쿼리
    // ===============================
    let countQuery = `SELECT COUNT(*) AS count FROM users WHERE 1=1`;
    let dataQuery = `SELECT * FROM users WHERE 1=1`;

    const params = [];

    // ===============================
    // 3. 검색 조건
    // ===============================
    if (searchName) {
        countQuery += ` AND Name LIKE ?`;
        dataQuery += ` AND Name LIKE ?`;
        params.push(`%${searchName}%`);
    }

    if (gender) {
        countQuery += ` AND Gender = ?`;
        dataQuery += ` AND Gender = ?`;
        params.push(gender);
    }

    // ===============================
    // 4. 페이지네이션 LIMIT
    // ===============================
    dataQuery += ` LIMIT ? OFFSET ?`;
    const dataParams = [...params, limit, offset];

    // ===============================
    // 5. 전체 개수 조회
    // ===============================
    db.get(countQuery, params, (err, countResult) => {
        if (err) {
            console.error(err);
            return res.status(500).send('DB Count Error');
        }

        const totalCount = countResult.count;
        const totalPages = Math.ceil(totalCount / limit);

        // ===============================
        // 6. 페이지 그룹 계산
        // ===============================
        const currentGroup = Math.ceil(page / PAGE_GROUP_SIZE);
        const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
        const endPage = Math.min(
            startPage + PAGE_GROUP_SIZE - 1,
            totalPages
        );

        // ===============================
        // 7. 실제 데이터 조회
        // ===============================
        db.all(dataQuery, dataParams, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).send('DB Data Error');
            }

            // ===============================
            // 8. View 렌더링
            // ===============================
            res.render('users', {
                users: rows,
                currentPage: page,
                totalPages,
                searchName,
                gender,
                startPage,
                endPage
            });
        });
    });
});

module.exports = router;
