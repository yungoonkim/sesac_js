
let start = 1, end = 20;

async function getItemsFromTo() {
    const result = document.getElementById('result');
    const response = await fetch(`/api/items?start=${start}&end=${end}`);
    const data = await response.json(); //모든 비동기 함수는 promise를 반환한다.
    // console.log(data);
    data.forEach(item => {
        // console.log(item);
        const itemElement = document.createElement('div');
        itemElement.classList.add('item'); //디자인을 넣기 위해 클래스를 붙임..
        itemElement.textContent = item;
        result.appendChild(itemElement);
    });
    //result.innerHTML = data;
}

document.addEventListener('DOMContentLoaded', () => {
    // console.log('DOM ready');
    // 4. async await으로 변경하기
    getItemsFromTo();
});

window.addEventListener('scroll', () => {
    console.log('스크롤 발생', window.innerHeight, window.scrollY);

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log('화면 끝 이동');

        start = end + 1;
        end = end + 10;
        getItemsFromTo();

    }
});
