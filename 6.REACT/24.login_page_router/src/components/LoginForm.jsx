import TextInput from './TextInput';

export default function LoginForm({
    form, 
    message, 
    canSubmit, //부모로 부터 입력 완료 상태를 받아옴 
    onChange, 
    onSubmit,
    idRef,
    pwRef
}){
    const boxStyle = { padding: 10, border: '1px solid #ddd', borderRadius: 8};

    const messageStyle = 
        message.type === 'success' 
        ? { ...boxStyle, borderColor: '#28e96eff', background: '#dcfce7'} 
        : message.type === 'error'
        ? { ...boxStyle, borderColor: '#e61d1dff', background: '#fee2e2'}
        : boxStyle;

    return (
        <form onSubmit={onSubmit}>
            <TextInput 
                label="아이디" 
                name="id" 
                value={form.id} 
                onChange={onChange}
                inputRef={idRef} 
            />

            <TextInput 
                label="비밀번호" 
                name="pw" 
                type="password" 
                value={form.pw} 
                onChange={onChange}
                inputRef={pwRef}
            />

            <label style={{ display:'flex', alignItems: 'center', gap: 8 }}>
                <input 
                    type='checkbox' 
                    checked={form.rememberId}
                    onChange={(e) => onChange('rememberId', e.target.checked)}
                />
                아이디 저장
            </label>

            {/* 입력이 덜 됐으면 버튼 비활성화 */}
            <button type="submit" disabled={!canSubmit}>로그인</button>

            {message.text && <div style={messageStyle}>{message.text}</div>} {/* 메세지가 있으면 찍어라.. */}
        </form>
    );
}