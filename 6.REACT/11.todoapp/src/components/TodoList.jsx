export default function TodoLsit({ todos, onToggle, onDelete, totalcheck }) {
    return (
        <ul style={{ marginTop: 12, paddingLeft: 16}} >
            {!totalcheck && todos.map((t) => (
                <li key={t.id} style={{ paddingBottom: 8 }}>
                    <input 
                        type="checkbox" 
                        checked={t.done} 
                        onChange={() => onToggle(t.id)}
                    />
                    <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
                        {t.text}
                    </span>
                    <button onClick={() => onDelete(t.id)} style={{ marginLeft: 'auto' }}>삭제</button>
                </li>
            ))}
        </ul>
    );
}