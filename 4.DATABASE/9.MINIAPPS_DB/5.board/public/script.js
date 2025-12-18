//1. 이 파일 즉 이 페이지가 최초로 불릴때, 게시판에 글이 있을 수도 있으니 로딩하기
document.addEventListener('DOMContentLoaded', () => {
    //fetch(게시판글)
    //.then(카드 만들기)
    console.log("전체 문서 로딩");

    fetch('/api/list')
        .then(res => res.json())
        .then(data => {
            console.log("백엔드 응답 data: ", data);
            data.forEach(post => createCard(post.id, post.title, post.message));
        });
});

function createCard(id, title, message) {
    //DOM 위치 가져오기
    //DOM 생성하기
    //기존에 있던 DOM의 차일드에 추가하기
    // console.log("카드 생성");
    const card = document.createElement('div');
    card.innerHTML = `
        <div class="card" id="card_${id}">
            <div class="card-body">
                <p class="card-id">${id}</p>
                <p class="card-title">${title}</p>
                <p class="card-text">${message}</p>
                <button class="btn btn-info" onclick="modifyPost(${id})">수정</button>
                <button class="btn btn-warning" onclick="deletePost(${id})">삭제</button>
            </div>
        </div>
    `;
    document.getElementById('card-list').appendChild(card);
}

function uploadPost() { //프런트에서 부른건 uploadPost()였음
    //DOM에서 입력한 글자들 가져오기..
    //fetch(글쓰기)
    //  .then(성공확인)
    //  .then(불러오기(=카드만들기))
    console.log('버튼 눌림');
    const title = document.getElementById('input-title').value;
    const message = document.getElementById('input-text').value;

    fetch('/api/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, message })
    })
        .then(res => res.json())
        .then(data => {

            if (data.result == 'success') {
                alert('저장 완료');
                location.reload(); //이 페이지 통째로 새로 부르기
            }
            else {
                alert('저장 실패')
            }
        })
}

function deletePost(id) {
    //fetch(글쓰기)
    //  .then(성공확인)
    //  .then(불러오기(=카드만들기))

    fetch(`/api/delete/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            if (data.result == 'success') {
                alert('삭제 완료');
                location.reload();
            }
            else {
                alert('삭제 실패');
            }
        })
}

function modifyPost(id) {
    //DOM으로 수정할 위치 가져오기s
    //기존에 글 있던 곳을, 글을 입력하는 곳의 DOM으로 바꾸기
    //저장 누르면??
    //fetch(글수정).then(성공확인).then(불러오기(=카드만들기))
    const cardEl = document.getElementById(`card_${id}`);

    const title = cardEl.querySelector('.card-title').innerText;
    const text = cardEl.querySelector('.card-text').innerText;

    cardEl.innerHTML = `
        <div class="card-body">
            <p class="card-id">${id}</p>
            <input class="form-control mb-2" id="edit-title-${id}" value="${title}" />
            <textarea class="form-control mb-2" id="edit-text-${id}">${text}</textarea>
            <button class="btn btn-success" onclick="savePost(${id})">저장</button>
            <button class="btn btn-secondary" onclick="cancelPost(${id})">취소</button>
        </div>
    `;
}

function savePost(id) {
    const cardEl = document.getElementById(`card_${id}`);

    const newTitle = document.getElementById(`edit-title-${id}`).value;
    const newText = document.getElementById(`edit-text-${id}`).value;

    cardEl.innerHTML = `
        <div class="card-body">
            <p class="card-id">${id}</p>
            <p class="card-title">${newTitle}</p>
            <p class="card-text">${newText}</p>

            <button class="btn btn-info" onclick="modifyPost(${id})">수정</button>
            <button class="btn btn-warning" onclick="deletePost(${id})">삭제</button>
        </div>
    `;

    fetch(`/api/modify/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: newTitle,
            message: newText
        })
    })
        .then(res => res.json())
        .then(data => {

            if (data.result == 'success') {
                alert('저장 완료');
                location.reload(); //이 페이지 통째로 새로 부르기
            }
            else {
                alert('저장 실패')
            }
        })
}


function cancelPost(id) {
    const cardEl = document.getElementById(`card_${id}`);

    cardEl.innerHTML = `
        <div class="card-body">
            <p class="card-id">${id}</p>
            <p class="card-title">${cardEl.dataset.originalTitle}</p>
            <p class="card-text">${cardEl.dataset.originalText}</p>

            <button class="btn btn-info" onclick="modifyPost(${id})">수정</button>
            <button class="btn btn-warning" onclick="deletePost(${id})">삭제</button>
        </div>
    `;
}
