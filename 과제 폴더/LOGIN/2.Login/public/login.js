
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', login); //로그인 버튼이 눌렸을때 이벤트 함수 등록
    document.getElementById('logoutButton').addEventListener('click', logout);
});

function login(e){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    e.preventDefault();
    fetch('/login', {
        method:'POST',
        headers:{ 'Content-Type' : 'application/json'},
        body: JSON.stringify( {username, password} )
    })
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            if(data.message === '로그인 성공'){
                // window.location = '/profile';
                document.getElementById('loginFormContainer').style.display = 'none';
                document.getElementById('profile').style.display = 'block';
            }
        });
}


function logout(e){
    fetch('/logout')
        .then(res => res.json())
        .then(data => {
            if(data.message === '로그 아웃 완료'){
                document.getElementById('loginFormContainer').style.display = 'block';
                document.getElementById('profile').style.display = 'none';
            }
        });
}