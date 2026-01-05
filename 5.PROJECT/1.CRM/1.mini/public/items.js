let currentName = '';
let currentGender = '';

document.querySelectorAll('.nav-link').forEach(e => {
    e.addEventListener('click', (nav) => {
        navText = nav.target.textContent.trim();
        switch(navText){
            case 'User':        window.location = '/users'; break;
            case 'Order':       window.location = '/orders'; break;
            case 'Order_Item':  window.location = '/order_items'; break;
            case 'Item':        window.location = '/items'; break;
            case 'Store':       window.location = '/stores'; break;
        }
    })
});

document.addEventListener('DOMContentLoaded', () => {



    fetchItems();

     // history.state에 저장된 값이 있는지 확인
    //const state = history.state || {};
    // const name = state.name || '';
    // const page = state.page || 1;
    // const gender = state.gender || '';

    // currentName = name;
    // searchName.value = name;
    
    // currentGender = gender;
    // console.log(gender);
    // if(gender == 'Male'){
    //     select.selectedIndex = 1;
    // }
    // else if(gender == 'Female'){
    //     select.selectedIndex = 2;
    // }
    // else
    //     select.selectedIndex = 0;
    
    // // 사용자를 가져올거야 
    // fetchOrders(currentName, page, currentGender);

    // searchBtn.addEventListener('click', () => {
    //     currentName = searchName.value;
    //     history.replaceState({ name: currentName, gender: currentGender, page: 1 }, '', window.location.pathname);
    //     fetchOrders(currentName, 1, currentGender);
    // })
});


document.getElementById('pagination').addEventListener('click', (e) => {
    if(e.target.classList.contains('page-link')) {
        e.preventDefault();

        const page = Number(e.target.dataset.page);
        // history.state + URL 변경
        history.pushState({ name: currentName, gender: currentGender, page: page }, '', `/users?page=${page}&gender=${currentGender}`);
        fetchItems(currentName, page, currentGender);
    }
});



function fetchItems() {
    // const queryString = `?name=${encodeURIComponent(name)}&page=${page}&gender=${gender}`;
    // console.log(queryString);

    // 백엔드에 요청을 고민...
    fetch(`/api/items`)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            // 테이블에 그려라
            renderTable(data.data);
            // 페이지네이션을 그려라
            renderPagination(data.totalCount);
        });
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');

    console.log(totalPages);

    let myPages = `<nav><ul class="pagination">`;

    for (let i = 1; i <= totalPages; i++) {
        myPages += `<li class="page-item"><a class="page-link" href="" data-page="${i}">${i}</a></li>`;
    }

    myPages += `</ul></nav>`;
    //console.log(myPages);

    //pagination.appendChild(myPages);
    pagination.innerHTML = myPages;
}

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
                if(key === 'Id'){
                    let link = document.createElement('a');
                    link.href = `/item_detail/${value}`;
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