import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./JoinPage.css";
import { useState } from "react";

const JoinPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    }

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const toJoin = () => {
        //joinAPI(username, password, passwordCheck);
        //console.log(flag);
        navigate("/login");
    }

    return (
        <div className="JoinPage">
            <h2>Join</h2>
            <div className="idWrapper">
                <input className="inputId" value={username} onChange={onChangeUsername} placeholder="아이디"/>
                <button className="idButton">중복 확인</button>
            </div>
            <div className="passwordWrapper">
                <input 
                 className="inputPassword" 
                 type="password" 
                 placeholder="비밀번호"
                 value={password}
                 onChange={onChangePassword}
                />
            </div>
            <div className="passwordWrapper">
                <input 
                 className="inputPassword" 
                 type="password" 
                 placeholder="비밀번호 번호"
                 value={passwordCheck}
                 onChange={onChangePasswordCheck}
                />
            </div>
            <div className="ButtonWrapper">
                <Button type={"positive"} text={"회원가입"} onClick={toJoin} />
                <Button text={"취소"} onClick={goBack} />
            </div>
        </div>
    );
}

export default JoinPage;