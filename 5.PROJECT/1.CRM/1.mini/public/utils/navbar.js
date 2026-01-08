export function initNav() {
    document.querySelectorAll('.nav-link').forEach(el => {
        el.addEventListener('click', (e) => {
            const navText = e.target.textContent.trim();

            const routeMap = {
                User: '/users',
                Order: '/orders',
                Order_Item: '/order_items',
                Item: '/items',
                Store: '/stores'
            };

            if (routeMap[navText]) {
                window.location = routeMap[navText];
            }
        });
    });
}
