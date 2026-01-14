export default function TodoCompleted({ totalchecked, onChange}){
    return(
        <>
            <input type="checkbox" checked={totalchecked} onChange={(e) => onChange(e.target.checked)} />
            <span> 완료 항목 숨기기 </span>
        </>
    )
}