import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./LoginPage.css"
import { useContext, useState } from "react";
import { DispatchContext } from "../App";

const LoginPage = () => {
    const [type, setType] = useState("default");
    const [id, setId] = useState("");
    const {toLogin} = useContext(DispatchContext);
    const [password, setPassword] = useState("");
    const onChangeId = (e) => {
        setId(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();
    const clickLogin = () => {
        if(id && password)
            toLogin(id, password);
        setType("wrong");
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
            <Button text={"로그인"} type={"positive"} onClick={clickLogin}/>
            <Button text={"회원가입"} onClick={goJoin} />
        </div>
    );
};

export default LoginPage;