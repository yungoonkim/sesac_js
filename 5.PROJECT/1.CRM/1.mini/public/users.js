import { renderTable } from './utils/table_render.js';
import { initNav } from './utils/navbar.js';

let currentName = '';
let currentGender = '';
const select = document.getElementById('select-type');


// document.querySelectorAll('.nav-link').forEach(e => {
//     e.addEventListener('click', (nav) => {
//         navText = nav.target.textContent.trim();
//         switch(navText){
//             case 'User':        window.location = '/users'; break;
//             case 'Order':       window.location = '/orders'; break;
//             case 'Order_Item':  window.location = '/order_items'; break;
//             case 'Item':        window.location = '/items'; break;
//             case 'Store':       window.location = '/stores'; break;
//         }
//     })
// });

function renderUserList(data) {
    renderTable({
        data,
        headerEl: document.getElementById('table-header'),
        bodyEl: document.getElementById('table-body'),
        visibleKeys: ['Id', 'Name', 'Gender', 'Age', 'Email'],
        rowClick: (row) => {
            window.location = `/users/${row.Id}`;
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {

    
    initNav();
    // 검색 버튼 활성화
    const searchBtn = document.getElementById('search-button');
    const searchName = document.getElementById('search-name');

     // history.state에 저장된 값이 있는지 확인
    const state = history.state || {};
    const name = state.name || '';
    const page = state.page || 1;
    const gender = state.gender || '';

    currentName = name;
    searchName.value = name;
    
    currentGender = gender;
    console.log(gender);
    if(gender == 'Male'){
        select.selectedIndex = 1;
    }
    else if(gender == 'Female'){
        select.selectedIndex = 2;
    }
    else
        select.selectedIndex = 0;
    
    // 사용자를 가져올거야 
    fetchUsers(currentName, page, currentGender);

    searchBtn.addEventListener('click', () => {
        currentName = searchName.value;
        history.replaceState({ name: currentName, gender: currentGender, page: 1 }, '', window.location.pathname);
        fetchUsers(currentName, 1, currentGender);
    })
});


select.addEventListener('change', () => {
    currentGender = select.value;
});


document.getElementById('pagination').addEventListener('click', (e) => {
    if(e.target.classList.contains('page-link')) {
        e.preventDefault();

        const page = Number(e.target.dataset.page);
        // history.state + URL 변경
        history.pushState({ name: currentName, gender: currentGender, page: page }, '', `/users?page=${page}&gender=${currentGender}`);
        fetchUsers(currentName, page, currentGender);
    }
});



function fetchUsers(name, page, gender) {
    const queryString = `?name=${encodeURIComponent(name)}&page=${page}&gender=${gender}`;
    console.log(queryString);

    // 백엔드에 요청을 고민...
    fetch(`/api/users${queryString}`)
        .then(response => response.json())
        .then(data => {
            // 테이블에 그려라
            //renderTable(data.data);
            renderUserList(data.data);
            // 페이지네이션을 그려라
            renderPagination(data.totalCount);
        });
}

// function renderPagination(totalPages) {
//     const pagination = document.getElementById('pagination');

//     console.log(totalPages);

//     let myPages = `<nav><ul class="pagination">`;

//     for (let i = 1; i <= totalPages; i++) {
//         myPages += `<li class="page-item"><a class="page-link" href="" data-page="${i}">${i}</a></li>`;
//     }

//     myPages += `</ul></nav>`;
//     //console.log(myPages);

//     //pagination.appendChild(myPages);
//     pagination.innerHTML = myPages;
// }

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');

    let myPages = `<nav><ul class="pagination">`;

    const maxVisiblePages = 10;
    const visiblePages = Math.min(totalPages, maxVisiblePages);

    // 1 ~ 10 페이지 표시
    for (let i = 1; i <= visiblePages; i++) {
        myPages += `
            <li class="page-item">
                <a class="page-link" href="" data-page="${i}">${i}</a>
            </li>`;
    }

    // 10페이지 초과하면 ... 표시
    if (totalPages > maxVisiblePages) {
        myPages += `
            <li class="page-item disabled">
                <span class="page-link">...</span>
            </li>
        `;

        // 마지막 페이지 표시
        myPages += `
            <li class="page-item">
                <a class="page-link" href="" data-page="${totalPages}">
                    ${totalPages}
                </a>
            </li>`;
    }

    myPages += `</ul></nav>`;
    pagination.innerHTML = myPages;
}



// function renderTable(data) {
//     // [{}] 데이터가 왕창 왔을꺼고.. 이걸 그리는걸 고민...
//     const tableHeader = document.getElementById('table-header');
//     const tableBody = document.getElementById('table-body');

//     tableHeader.innerHTML = '';
//     tableBody.innerHTML = '';

//     if (data.length > 0) {
//         // 1. 테이블의 헤더 생성
//         // 첫번째 요소를 가져와서(data[0]) 그 안에 key를 뽑아내서,
//         // tr/th를 만든다.
//         const headers = Object.keys(data[0]);
//         const headerRow = document.createElement('tr');
//         headers.forEach(h => {
//             // 원하는거 제거
//             if (h != 'Address') {
//                 const one_th = document.createElement('th');
//                 one_th.textContent = h;
//                 headerRow.appendChild(one_th);
//             }
//         });

//         // 만드걸 tableheader의 child로 append한다.
//         tableHeader.appendChild(headerRow);

//         // 2. 테이블의 바디 생성
//         // 리스트만큼 돌면서 tr/td를 그리는것..
//         data.forEach(row => {
//             const bodyRow = document.createElement('tr');

//             // 해당 row 에다가 이벤트
//             bodyRow.addEventListener('click', () => {
//                 console.log('해당 줄 클릭됨');
//                 window.location = `/users/${row.Id}`  // 브라우저 창에 주소를 넣어서 이동하는 방법
//             });

//             for (const [key, value] of Object.entries(row)) {
//                 if (key != 'Address') {
//                     const one_td = document.createElement('td');
//                     one_td.textContent = value;
//                     bodyRow.appendChild(one_td);
//                 }
//             }

//             // 만든걸 tablebody의 child로 append한다.
//             tableBody.appendChild(bodyRow);
//         });

//     } else {
//         tableBody.innerHTML = ' --- 표시할 데이터가 없습니다 --- ';
//     }
// }