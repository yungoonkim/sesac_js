const Common = require('./Common');
const now = new Date();

class Order extends Common {

    getOrderAt() {
        
        const year = now.getFullYear();
        const month = String(now.getMonth()).padStart(2, '0');
        const day = String(now.getDay()).padStart(2, '0');

        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');
        const second = String(now.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}

module.exports = Order;