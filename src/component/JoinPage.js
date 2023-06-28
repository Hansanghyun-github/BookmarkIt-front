import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./JoinPage.css";

const JoinPage = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    const toJoin = () => {
        navigate("/login");
    }

    return (
        <div className="JoinPage">
            <h2>Join</h2>
            <div className="idWrapper">
                <input className="inputId"  placeholder="아이디"/>
                <button className="idButton">중복 확인</button>
            </div>
            <div className="passwordWrapper">
                <input className="inputPassword" type="password" placeholder="비밀번호"/>
            </div>
            <div className="passwordWrapper">
                <input className="inputPassword" type="password" placeholder="비밀번호 번호"/>
            </div>
            <div className="ButtonWrapper">
                <Button type={"positive"} text={"회원가입"} onClick={toJoin} />
                <Button text={"취소"} onClick={goBack} />
            </div>
        </div>
    );
}

export default JoinPage;