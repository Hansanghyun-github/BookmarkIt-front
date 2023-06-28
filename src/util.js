import googleMark from "./img/google_mark.webp";
import kakaoMark from "./img/kakao_mark.webp";
import naverMark from "./img/naver_mark.webp";


export const getImgById = (imgId) => {
    const targetId = String(imgId);
    switch(targetId) {
        case "google":
            return googleMark;
        case "naver":
            return naverMark;
        case "kakao":
            return kakaoMark;
        default:
            return null;
    }
};