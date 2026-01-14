import { useState } from 'react'
import SearchBar  from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { fetchSearch } from '../api/naverBlogApi.js';

function App() {
  const [query, setQuery] = useState(''); //검색어를 저장할 변수
  const [results, setResults] = useState([]); //검색 결과 저장

  const handleSearch = async (e) => {
    e.preventDefault();
    try{
      const data = await fetchSearch({query});
      setResults(data.items);
    }
    catch(err){
      console.error(err);
    }
  };

  return (
    <div>
      <h1>마이 블로그 검색</h1>
      {/* 입력창 */}
      <SearchBar onSubmit={handleSearch} onChange={setQuery}/>
      {/* 결과창 */}
      <SearchResults results={results} />
    </div>
  )
}

export default App
