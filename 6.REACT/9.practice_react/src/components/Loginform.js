import Textinput from './Textinput';

export default function Loginform({form, onSubmit, onChange}) {
    return(
        <form onSubmit={onSubmit}>
            <Textinput label="아이디" name="id" value={form.id} onChange={onChange} /> {/* id */}
            <Textinput label="비밀번호" name="pw" type="password" value={form.pw} onChange={onChange} /> {/* pw */}

            <button type="submit">로그인</button>
        </form>
    );
};