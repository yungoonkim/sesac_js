import Loginform from '../components/Loginform';
import { useState } from 'react';

export default function Loginpage() {
    const [form, setForm] = useState({id: '', pw: ''});

    const updateField = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <h2>로그인</h2>
            <Loginform form={form} onSubmit={handleSubmit} onChange={updateField} />
        </div>
    );
}