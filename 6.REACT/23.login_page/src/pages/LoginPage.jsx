// useRef는 DOM 및 랜더링과 무관한 DOM 요소를 제어하기 위해 사용한다.

import { useState, useMemo, useRef, useEffect } from "react";
import LoginForm from '../components/LoginForm';

const SAVED_ID_KEY = 'saved_login_id';

function getInitialForm() {

    const savedId = localStorage.getItem(SAVED_ID_KEY) || '';
    return {
        id: savedId,
        pw: '',
        rememberId: Boolean(savedId),
    }
}

function LoginPage() {
    //getInitalForm()은 컴포넌트가 실행 될때마다 반복
    //() => getInitalForm()은 컴포넌트만들어질때? 한번 실행
    //const [form, setForm] = useState(getInitialForm()); //lazy initalization 아님 이건 값을 바로 셋팅함. 페이지 진입시마다 호출됨
    const [form, setForm] = useState(() => getInitialForm()); //lazy initalization 이 페이지가 불릴때 1회만 호출
    const [message, setMessage] = useState({ type: '', text: '' }); //성공/실패 메세지를 담았다가 출력할 곳

    const idRef = useRef(null);
    const pwRef = useRef(null);

    const updateField = (name, value) => {
        setForm((prev) => {
            const next = { ...prev, [name]: value };

            if (name == 'rememberId') {
                if (!value) {
                    localStorage.removeItem(SAVED_ID_KEY);
                }
                else if (prev.id.trim()) {
                    localStorage.setItem(SAVED_ID_KEY, prev.id.trim());
                }
                
            }
            return next;
        });
        // setForm((prev) => ({ ...prev, [name]: value }));

        // if(name === 'rememberId'){
        //      if (value) {
        //         localStorage.setItem(SAVED_ID_KEY, form.id);
        //     }
        //     else if (!value) {
        //         localStorage.clear();
        //     }
        // }
    }

    //미션.. 이 페이지가 처음 불릴때, 로컬스토리지에 저장된 SAVED_ID_KEY가 있으면 불러온다.
    // React 19.x에서는 이것을 비추천함.
    // useEffect(() => {
    //     const savedId = localStorage.getItem(SAVED_ID_KEY);
    //     if (savedId) {
    //         setForm((prev) => ({ ...prev, id: savedId, rememberId: true }));
    //     }
    // }, []);

    // useEffect(() => {
    //     idRef.current?.focus();
    // }, []);

    useEffect(() => {
        if(form.rememberId) pwRef.current?.focus();
        else idRef.current?.focus();
    }, [form.rememberId]);

    useEffect(() => {
        if(message.type !=='success') return;

        const timer = setTimeout(() => {
            setMessage({type: '', text: ''});
        }, 2000);

        //cleanup 함수
        return () => clearTimeout(timer);
    },[message]);



    //이런 것들을 useMemo()를 통해서 관리하면 더 좋음.
    const canSubmit = useMemo(() => {
        return form.id.trim() !== '' && form.pw.trim() !== '';
    }, [form]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = form.id.trim();
        const pw = form.pw.trim();

        //지워도 무방함..
        if (!id || !pw) {
            setMessage({ type: 'error', text: '아이디와 비밀번호를 모두 입력해 주세요.' });
            return;
        }

        //가상의 id/pw 체크 로직
        const ok = id === 'admin' && pw === '1234';

        if (ok) {
            setMessage({ type: 'success', text: '로그인 성공' });
            setForm((prev) => ({ ...prev, pw: '' }));
        }
        else {
            setMessage({ type: 'error', text: '로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.' });
            setForm((prev) => ({ ...prev, pw: '' })); //있는건 놔두고 나머지만 지울거다.
        }
    }

    return (
        <div style={{ maxWidth: 360, margin: '40px auto' }}>
            <h2>로그인</h2>
            <LoginForm
                form={form}
                message={message}
                canSubmit={canSubmit}
                onChange={updateField}
                onSubmit={handleSubmit}
                idRef={idRef}
                pwRef={pwRef}
            />
        </div>
    );
}

export default LoginPage;