const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

let todos = []; //여기에 사용자가 입력한 todo가 담길 곳
let idCounter = 1; //li가 추가 될때마다 추가

app.use(express.static('public'));
app.use(express.json());    //FE에서 보내온 데이터를 json으로 보냈다면... 그걸 파싱해서 req.body에 담아줌
//app.use(express.urlencoded({extended: false}))  //FE에서 보낸 데이터가 urlencoded로 보냈다면... 그걸 파싱해서 req.body에 담아줌..
app.use(morgan('dev'));

//라우트 설계
app.get('/api/todo', (req, res) => {
    console.log('todo 달라고 요청함');
    res.send(todos);
});

app.post('/api/todo', (req, res) => {
    console.log('생성 해달라고 요청함');
    console.log(`요청의바디: ${JSON.stringify(req.body)}`);

    const newTodo = {id: idCounter++, todo: req.body.todo, completed: false};

    console.log(newTodo);
    todos.push(newTodo);
    res.json(newTodo);
    //res.json({id: newTodo.id}); //id만 줌..
    res.json({"status":"ok"});
});

//삭제
app.delete('/api/todo', (req, res) => { //입력 인자를 ? query 파라미터로 받을지 URL 파라미터로 받을지
    console.log('삭제해 달라고 요청함');
    //글자를 받을 경우 중복 글자로 인해 잘못 지워 질 수 있음
    // id를 받아서, 그 id를 가진 항목을 삭제한다.
    // todos.filter를 통해서 비교해본다.
    res.json({success: true}); //다양한 양식일뿐, 결론적으로는 한 타입으로 통일...
});

//수정
app.put('/api/todo', (req, res) => { //입력 인자...
    console.log('수정해 달라고 요청함');
    //completed toggle
    //id를 찾아서
});


//라우트 끝

app.listen(PORT, () => {
    console.log(`Server is ready http://localhost:${PORT}`);
}); 