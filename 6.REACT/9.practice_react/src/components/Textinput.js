
export default function Textinput({
    label, 
    name, 
    type = 'text', 
    value, 
    onChange
}) {
    return (
        <label>
            <span>{label}</span>
            <input type={type} value={value} onChange={(e) => onChange(name, e.target.value)} />
        </label>
    );
}