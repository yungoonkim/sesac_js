const storeId = window.location.pathname.split('/').pop(); // 주소를 가져와서 / 로 짤라서 맨 뒤에꺼 반환
// console.log('storeId: ', storeId);
console.log('store_detail 시작');

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

function fetchStoreDetail() {
    fetch(`/api/store_detail/${storeId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            renderTable(data);
            renderMonthRevenue(data);
        })
}

function renderTable(data) {
    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    const headers = Object.keys(data[0]);
    console.log(headers);
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
        const one_th = document.createElement('th');
        if(h === 'Name' || h === 'Type' || h === 'Address'){
            one_th.textContent = h;
            headerRow.appendChild(one_th);
        }
    });

    tableHeader.appendChild(headerRow);

    const bodyRow = document.createElement('tr');
    for (const [key, value] of Object.entries(data[0])) {
        const one_td = document.createElement('td');
       
        if(key === 'Name' || key === 'Type' || key === 'Address'){
            one_td.textContent = value;
            bodyRow.appendChild(one_td);
        }
    }

    tableBody.appendChild(bodyRow);
}

function renderMonthRevenue(data) {
    // [{}] 데이터가 왕창 왔을꺼고.. 이걸 그리는걸 고민...
    const tableHeader = document.getElementById('table-h-store');
    const tableBody = document.getElementById('table-b-store');

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
            if(h !== 'Name' && h !== 'Type' && h !== 'Address'){
                one_th.textContent = h;
                headerRow.appendChild(one_th);
            }
        });

        // 만드걸 tableheader의 child로 append한다.
        tableHeader.appendChild(headerRow);

        // 2. 테이블의 바디 생성
        // 리스트만큼 돌면서 tr/td를 그리는것..
        data.forEach(row => {
            const bodyRow = document.createElement('tr');
            for (const [key, value] of Object.entries(row)) {
                const one_td = document.createElement('td');

                bodyRow.addEventListener('click', (e) => {
                    console.log('해당 줄 클릭됨');
                    e.stopPropagation();
                    const queryString = `${storeId}?rev_month=${encodeURIComponent(value)}`;
                    console.log(queryString);
                    fetch(`/api/store_detail/${queryString}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log('store 2차 fetch data', data);
                            renderTable(data);
                            renderMonthRevenue(data);
                        });
                });

                // if(key !== 'Name' && key !== 'Type' && key !== 'Address'){

                //     if(key === 'Month'){
                //         let link = document.createElement('a');
                //         const queryString = `${storeId}?rev_month=${encodeURIComponent(value)}`;
                //         link.href = `/api/store_detail/${queryString}`;
                //         link.textContent = value;
                //         one_td.appendChild(link);
                //     }
                //     else one_td.textContent = value;
                    one_td.textContent = value;     
                    bodyRow.appendChild(one_td);
                //}
            }

            // 만든걸 tablebody의 child로 append한다.
            tableBody.appendChild(bodyRow);
        });

    } else {
        tableBody.innerHTML = ' --- 표시할 데이터가 없습니다 --- ';
    }
}

fetchStoreDetail();