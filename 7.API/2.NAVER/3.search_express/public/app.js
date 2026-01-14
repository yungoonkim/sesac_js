const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    search();
})

async function search(){

    const query = document.getElementById('query');
    const queryStr = query.value.trim();
    
    if(!queryStr) return;
    //요청 및 결과 처리
    const results = document.getElementById('results');
    results.innerHTML = `<li>로딩중...</li>`;
    
    // try-catch 나중에 넣을 부분
    const resp = await fetch(`/api/search?query=${encodeURIComponent(queryStr)}&page=${currentPage}&display=${MAX_PAGE_NUM}`);
    const data = await resp.json();

    renderResults(data);
    renderPagination(data);
}

function renderResults(data){

    results.innerHTML = '';
    results.innerHTML = `<h4>검색결과수: ${data.totalResults}</h4>`

    if(data.items && data.items.length > 0){
        data.items.forEach((item) => {
            console.log(item);
            const li = document.createElement('li');
            li.innerHTML = `
                <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                <p>${item.description}</p>
                <small>${item.postdate}</small>
            `;
            results.appendChild(li);
        })
    }
}

const MAX_PAGE_NUM = 10;

let currentPage = 1;

function renderPagination(data){
    const totalPages = Math.min(MAX_PAGE_NUM, Math.ceil(data.total/data.display));

    const paginationDiv = document.getElementById('pagination');

    paginationDiv.innerHTML =''; //일단 지우고 다시 만든다.

    paginationDiv.appendChild(createButton("<<", 1, currentPage === 1));
    paginationDiv.appendChild(createButton("<", currentPage - 1, currentPage === 1));

    for(let p = 1; p <= totalPages; p++){
        paginationDiv.appendChild(createButton(p, p, false));
    }
    paginationDiv.appendChild(createButton(">", currentPage + 1, currentPage === totalPages));
    paginationDiv.appendChild(createButton(">>", totalPages, currentPage === totalPages));
    
}

function createButton(label, page, disabled){
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.disabled = disabled;

    if(page === currentPage){
        btn.style.fontWeight = 'bold';
    }

    btn.addEventListener('click', () => {
        currentPage = page;
        console.log('버튼 클릭됨: ', currentPage);
        search();
    })

    return btn;
}