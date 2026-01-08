router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const pageGroupSize = 10;

    db.get(`SELECT COUNT(*) AS total FROM items`, (err, countRow) => {
        const totalPages = Math.ceil(countRow.total / limit);

        const startPage = Math.floor((page - 1) / pageGroupSize) * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

        db.all(
            `SELECT * FROM items LIMIT ? OFFSET ?`,
            [limit, offset],
            (err, items) => {
                res.render('items', {
                    items,
                    currentPage: page,
                    totalPages,
                    startPage,
                    endPage
                });
            }
        );
    });
});
