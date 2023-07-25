import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./LoginPage.css"
import { useState } from "react";

const LoginPage = () => {
    //const [searchParams, setSearchParams] = useSearchParams();
    const type = "default";
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const onChangeId = (e) => {
        setId(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();
    const toLogin = () => {
        // TODO login check
        // const flag = loginAPI(id, password);
        navigate("/bookmarks");
    };
    const goJoin = () => {
        navigate("/join");
    };

    return (
        <div className="LoginPage">
            <h2>Login</h2>
            <span className={`span_${type}`}>아이디나 비밀번호가 맞지 않습니다</span>
            <div className="editor_wrapper">
                <input value={id} onChange={onChangeId} placeholder="아이디"/>
            </div>
            <div>
                <input type="password" value={password} onChange={onChangePassword} placeholder="비밀번호"/>
            </div>
            <Button text={"로그인"} type={"positive"} onClick={toLogin}/>
            <Button text={"회원가입"} onClick={goJoin} />
        </div>
    );
};

export default LoginPage;