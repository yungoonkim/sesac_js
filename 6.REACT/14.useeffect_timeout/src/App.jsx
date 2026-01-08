import { useState, useEffect } from 'react'

function App() {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {

    if(!keyword){
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      //api 호출
      console.log('검색 실행: ', keyword);
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((data) => {
            const filtered = data.filter((u) => u.name.toLowerCase().includes(keyword.toLowerCase()));
            setUsers(filtered);
        })
    }, 500); //0.5초 뒤에... 

    //이전에 timeout 설정한걸 그 다음 useeffect가 이전의 useeffect를 cleanup 하는 함수
    return () => clearTimeout(timer);

  }, [keyword]);

  

  return (
    <>
      <div>

        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder='검색어 입력' />

        <ul>
          {users.map((u) =>(
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>

      </div>
    </>
  )
}

export default App
