// useRef는 DOM 및 랜더링과 무관한 DOM 요소를 제어하기 위해 사용한다.
import LoginForm from '../components/LoginForm';

import { useNavigate } from "react-router-dom";
import { useLoginForm } from "../hooks/useLoginForm";
import { useAuth } from '../auth/AuthProvider';



function LoginPage() {
    //getInitalForm()은 컴포넌트가 실행 될때마다 반복
    //() => getInitalForm()은 컴포넌트만들어질때? 한번 실행
    //const [form, setForm] = useState(getInitialForm()); //lazy initalization 아님 이건 값을 바로 셋팅함. 페이지 진입시마다 호출됨
    const navigate = useNavigate();
    const { login } = useAuth();

    const {
        form, message, canSubmit, 
        updateField, submit, 
        idRef, pwRef
    } = useLoginForm();
    
     //이런 것들을 useMemo()를 통해서 관리하면 더 좋음.
  


    const handleSubmit = async (e) => {
        e.preventDefault();
       
        //가상의 id/pw 체크 로직
        try{
            
            const user = await submit();
            console.log('로그인 결과: ', user);
            login(user);
            navigate('/profile');
        }
        catch(err){
            //일단 스킵
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