import { useNavigate } from "react-router-dom";
import { getImgById } from "../util";
import "./Oauth2Page.css";

const Oauth2Page = () => {
    const navigate = useNavigate();
    const googleLogin = () => {
        alert("소셜 로그인 기능은 곧 추가됩니다");
    };
    const kakaoLogin = () => {
        alert("소셜 로그인 기능은 곧 추가됩니다");
    };
    const naverLogin = () => {
        alert("소셜 로그인 기능은 곧 추가됩니다");
    };

    return (
        <div className="oauth2">
            <div><span>Social Login</span></div>
            <button className="googleMark" onClick={googleLogin}><img alt="google login" src={getImgById("google")}/></button>
            <button className="kakaoMark" onClick={kakaoLogin}><img alt="kakao login" src={getImgById("kakao")}/></button>
            <button className="naverMark" onClick={naverLogin}><img alt="naver login" src={getImgById("naver")}/></button>
        </div>
    );
};

export default Oauth2Page;