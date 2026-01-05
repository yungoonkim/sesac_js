const orderId = window.location.pathname.split('/').pop(); // 주소를 가져와서 / 로 짤라서 맨 뒤에꺼 반환
console.log('orderId: ', orderId);

document.querySelectorAll('.nav-link').forEach(e => {
    e.addEventListener('click', (nav) => {
        navText = nav.target.textContent.trim();
        switch (navText) {
            case 'User': window.location = '/users'; break;
            case 'Order': window.location = '/orders'; break;
            case 'Order_Item': window.location = '/order_items'; break;
            case 'Item': window.location = '/items'; break;
            case 'Store': window.location = '/stores'; break;
        }
    })
});

function fetchOrderDetail() {
    fetch(`/api/order_detail/${orderId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderTable(data);
        })
}

function renderTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    const headers = Object.keys(data);
    console.log(headers);
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
        const one_th = document.createElement('th');
        one_th.textContent = h;
        headerRow.appendChild(one_th);
    });

    tableHeader.appendChild(headerRow);

    const bodyRow = document.createElement('tr');
    for (const [key, value] of Object.entries(data)) {
        const one_td = document.createElement('td');
        if (key == 'StoreId' || key == 'UserId') {
           let link = document.createElement('a'); 
           link.href = key === 'StoreId' ? `/store_detail/${value}` : `/users/${value}`;
           link.textContent = value;
           one_td.appendChild(link);
        }
        else one_td.textContent = value;
      
        bodyRow.appendChild(one_td);
    }

    tableBody.appendChild(bodyRow);
}

fetchOrderDetail();