export default function SearchBar({ onSubmit, onChange}){
    // const [inputValue, setInputValue] = useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onSubmit(inputValue);
    // }

    return(
        <form onSubmit={onSubmit}>
            <input 
                type='text' 
                placeholder='검색어를 입력하시오.' 
                onChange={(e) => onChange(e.target.value)} 
            />
            <button type='submit'>검색</button>
        </form>
    );
}