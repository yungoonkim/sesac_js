const input = document.getElementById('input');
const sendBtn = document.getElementById('sendBtn');
const chatbox = document.getElementById('chatbox');

function add(role, text){

    console.log(`Role: ${role}, Text: ${text}`);
    const bubble = document.createElement('div');
    bubble.className = 'mb-2';
    bubble.className = `d-flex ${role === 'user' ? 'justify-content-end' : 'justify-content-start'}`;

    const badge = role === 'user'
        ? `<span class="badge text-bg-primary me-2">나</span>`
        : `<span class="badge text-bg-danger me-2">봇</span>`;

    bubble.innerHTML = `${badge}<span>${text}</span>`;
    chatbox.appendChild(bubble);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function chat(message){
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ message })
    });

    const data = await res.json();
    console.log(data);

    return data.reply;
}

async function send(){

    const text = input.value.trim();
    if(!text) return;
    add('user', text);
    input.value = ''; //입력 글자 지우기.

    try{
        const reply = await chat(text);
        add('bot', reply); //화면에 오류 메세지 출력하기
    }
    catch(err){
        add('bot', err); //화면에 오류 메세지 출력하기
    }
}

sendBtn.addEventListener('click', send);

input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        send();
    }
})