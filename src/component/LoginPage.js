import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./LoginPage.css"

const LoginPage = () => {
    const navigate = useNavigate();
    const toLogin = () => {
        // TODO login check
        navigate("/bookmarks");
    };
    const goJoin = () => {
        navigate("/join");
    };

    return (
        <div className="LoginPage">
            <h2>Login</h2>
            <div className="editor_wrapper">
                <input placeholder="아이디"/>
            </div>
            <div>
                <input type="password" placeholder="비밀번호"/>
            </div>
            <Button text={"로그인"} type={"positive"} onClick={toLogin}/>
            <Button text={"회원가입"} onClick={goJoin} />
        </div>
    );
};

export default LoginPage;