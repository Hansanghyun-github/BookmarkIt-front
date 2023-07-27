import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./JoinPage.css";
import { useContext, useState } from "react";
import { DispatchContext } from "../App";

const JoinPage = () => {
    const {toJoin, isDuplicate} = useContext(DispatchContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [duplicateCheck, setDuplicateCheck] = useState({
        name: "default",
        text: "중복 확인"
    });

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setDuplicateCheck({
            name: "default",
            text: "중복 확인"
        });
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
    const clickJoin = () => {
        if(!username){
            alert("아이디를 입력하세요");
            return;
        }
        if(duplicateCheck.name !== "checked"){
            alert("아이디 중복 확인을 해주세요");
            return;
        }
        if(!password || password.length < 8 || password.length > 20){
            alert("유효하지 않은 비밀번호입니다(영문,숫자,특수문자 포함 8자이상 20자이하)");
            return;
        }
        if(!passwordCheck || password !== passwordCheck){
            alert("비밀번호 확인이 맞지 않습니다");
            return;
        }

        toJoin(username, password);
        
    }

    const onClickDuplicate = async () => {
        if(!username){
            alert("아이디를 입력하세요");
            return;
        }
        const result = await isDuplicate(username);
        if(!result){
            setDuplicateCheck({
                name: "checked",
                text: "✔"
            })
        }
        else
            alert("중복된 아이디입니다");
    }

    return (
        <div className="JoinPage">
            <h2>Join</h2>
            <div className="idWrapper">
                <input className="inputId" value={username} onChange={onChangeUsername} placeholder="아이디"/>
                <button className={["idButton", `idButton_${duplicateCheck.name}`].join(" ")} onClick={onClickDuplicate}>{duplicateCheck.text}</button>
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
                 placeholder="비밀번호 확인"
                 value={passwordCheck}
                 onChange={onChangePasswordCheck}
                />
            </div>
            <div className="ButtonWrapper">
                <Button type={"positive"} text={"회원가입"} onClick={clickJoin} />
                <Button text={"취소"} onClick={goBack} />
            </div>
        </div>
    );
}

export default JoinPage;