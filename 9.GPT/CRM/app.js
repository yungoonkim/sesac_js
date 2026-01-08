const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 라우트 import
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const orderItemRoutes = require('./routes/orderItems');
const itemRoutes = require('./routes/items');
const storeRoutes = require('./routes/stores');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRoutes);
app.use('/items', itemRoutes);
app.use('/stores', storeRoutes);

app.get('/', (req, res) => res.redirect('/users'));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
