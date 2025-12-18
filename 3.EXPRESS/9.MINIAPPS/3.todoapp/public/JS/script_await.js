document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM 로딩 완료');

    async function getTodo() {
        //최초 시작하자 마자 백엔드에 가지고 있는 목록 달라고 요청한다.
        const res = await fetch('/api/todos'); //요청
        const data = await res.json();
        console.log(data);
        renderTodos(data);
    }

    getTodo();

    function renderTodos(todos) {
        const result = document.getElementById('todo-list');
        result.innerHTML = ''; //기존에 있는거 지운다..

        //새로운 todos를 반복적으로 하나하나 돌면서 하나하나 dom을 그린다.
        todos.forEach(todo => {
            const li = document.createElement('li');

            li.textContent = todo.todo; //todo라는 나의 변수 안에 있는 todo라는 key의 값을 가져오는 것

            li.classList.toggle('completed', todo.completed);
            // if(todo.completed){
            //     li.classList.add('completed');
            // }
            // else{
            //     li.classList.remove('completed');
            // }
            result.appendChild(li);

            li.addEventListener('click', async () => {
                const res = await fetch(`/api/todo/${todo.id}/completed`, { method: 'PUT' });
                const data = await res.json(); //음.. 지금은 리턴값 확인 안하는 나쁜코드임.
                if(data.success == true){
                    getTodo();
                }
                else{
                    alert('해당 항목은 찾을 수 없습니다.');
                }
            })

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '삭제';
            deleteBtn.addEventListener('click',async (e) => {
                e.stopPropagation(); //이벤트가 부모까지 전달 되는 것을 방지.
                const res = await fetch(`/api/todo/${todo.id}`, { method: 'DELETE' });
                getTodo();
            })
            li.appendChild(deleteBtn);
        });
    }

    const addBtn = document.getElementById('add-todo');
    addBtn.addEventListener('click', async () => {
        const inputText = document.getElementById('new-todo').value;
        const text = inputText.trim(); //빈 공백 제거
        console.log(text);
        if (!text) return;

        const res = await fetch('/api/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ todo: text }) //문자화 또는 직렬화(serialization)
        });
        const data = await res.json();
        getTodo();
    });
});