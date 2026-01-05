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

function fetchOrderItemDetail() {
    fetch(`/api/orderitem_detail/${orderId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderTable(data);
        })
}

// function renderTable(data) {
//     const tableHeader = document.getElementById('table-header');
//     const tableBody = document.getElementById('table-body');

//     tableHeader.innerHTML = '';
//     tableBody.innerHTML = '';

//     const headers = Object.keys(data);
//     console.log(headers);
//     const headerRow = document.createElement('tr');
//     headers.forEach(h => {
//         const one_th = document.createElement('th');
//         one_th.textContent = h;
//         headerRow.appendChild(one_th);
//     });

//     tableHeader.appendChild(headerRow);

//     const bodyRow = document.createElement('tr');
//     for (const [key, value] of Object.entries(data)) {
//         const one_td = document.createElement('td');
//         if (key == 'OrderId' || key == 'ItemId') {
//             let link = document.createElement('a');
//             link.href = key === 'OrderId' ? `/order_detail/${value}` : `/item_detail/${value}`;
//             link.textContent = value;
//             one_td.appendChild(link);
//         }
//         else one_td.textContent = value;

//         bodyRow.appendChild(one_td);
//     }

//     tableBody.appendChild(bodyRow);
// }

function renderTable(data) {
    // [{}] 데이터가 왕창 왔을꺼고.. 이걸 그리는걸 고민...
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (data.length > 0) {
        // 1. 테이블의 헤더 생성
        // 첫번째 요소를 가져와서(data[0]) 그 안에 key를 뽑아내서,
        // tr/th를 만든다.
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(h => {
            // 원하는거 제거
                const one_th = document.createElement('th');
                one_th.textContent = h;
                headerRow.appendChild(one_th);
        });

        // 만드걸 tableheader의 child로 append한다.
        tableHeader.appendChild(headerRow);

        // 2. 테이블의 바디 생성
        // 리스트만큼 돌면서 tr/td를 그리는것..
        data.forEach(row => {
            const bodyRow = document.createElement('tr');

            for (const [key, value] of Object.entries(row)) {
                const one_td = document.createElement('td');
                if (key == 'OrderId' || key == 'ItemId') {
                    let link = document.createElement('a');
                    link.href = key === 'OrderId' ? `/order_detail/${value}` : `/item_detail/${value}`;
                    link.textContent = value;
                    one_td.appendChild(link);
                }
                else one_td.textContent = value;

                bodyRow.appendChild(one_td);
            }

            // 만든걸 tablebody의 child로 append한다.
            tableBody.appendChild(bodyRow);
        });

    } else {
        tableBody.innerHTML = ' --- 표시할 데이터가 없습니다 --- ';
    }
}

fetchOrderItemDetail();