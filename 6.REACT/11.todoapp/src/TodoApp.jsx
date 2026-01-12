import { useState } from 'react'
import TodoForm from './components/TodoForm.jsx';
import TodoLsit from './components/TodoList.jsx';

export default function TodoApp() {

  const [todos, setTodos] = useState([
    { id:1, text: 'React 공부하기', done: false},
    { id:2, text: 'Vite 공부하기', done: false},
  ]);

  const [check, setCheck] = useState(false);

  const count = todos.length;
  const completed = countCompleted();

  //Controlled 상태
  const [text, setText] = useState('');

  function checkState(){
    check === true ? setCheck(true) : setCheck(false);
  }

  function addTodo(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if(!trimmed) return;

    const newTodo = {
      id: Date.now(), //가장 간단하게 id를 만들기
      text: trimmed,
      done: false,
    }

    setTodos((prev) => [newTodo, ...prev]); //새로운걸 앞에 추가
    setText('');
  }

  function deleteTodo(id){
    setTodos((prev) => prev.filter((t) => t.id !== id));

    // setTodos((prev) => {
    //   const fillteredTOdos = prev.fillter((t) => t.id !== id);
    // }

    //아래처럼 하면 안됨.
    // const index = todos.findIndex(t => t.id === id);
    // todos.splice(index, 1); //원본 데이터를 건드림.
    // setTodos(todos);
  }

  function toggleTodo(id) {
    //직정 direct로 변경하면 안되고
    //멤버의 값만 바꾸면 안됨.
    // const todo = todos.find(t => t.id === id);
    // todo.done = !todo.done;


    setTodos((prev) =>
      prev.map(t => {
        if(t.id !== id) return t; //클릭된게 아니면, 그대로 둠
        return {...t, done: !t.done} //클릭된 항목만 다른 컴럼은 두고, done 컴럼만 바꿈..
      }))
  }

  function countCompleted() {
    const filtertodos = todos.filter((t) => t.done == true);
    return filtertodos.length;
  }

  return (
    <>            
      <div style={{ padding: 16, maxWidth: 500 }}>
        <h2>할일 목록</h2>
        <span>전체:{count} / 완료: {completed}</span>
        <TodoForm text={text} setText={setText} onAdd={addTodo} />
        <input type="checkbox" totalcheck={check} onChange={(e) => checkState(e.target.checked)} />
        <span> 완료 항목 숨기기 </span>
        <TodoLsit todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} maincheck={check} />
      </div>
    </>
  )
}


