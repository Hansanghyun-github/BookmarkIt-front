import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();
    const goLoginPage = () => {
        navigate("/login");
    };
    const goTestPage = () => {
        navigate("/test");
    }

    return (
        <div className="Home">
            Bookmarkit
            {/* 설명 글 & 그림 */}
            <div className="HomeButton">
                <Button type={"positive"} onClick={goLoginPage} text={"로그인"}/>
                {/* <Button onClick={goTestPage} text={"테스트"}/> */}
            </div>
        </div>
    );
}

export default Home;