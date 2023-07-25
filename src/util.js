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




/* ------------------- Folder method --------------------- */

export const initFolders = (it) => {
    it.clicked = 0;
    it.children.map((child) => initFolders(child));
  }

export const updateFolder = (folderList, id, clicked) => {
    folderList.forEach((it) => {
        if(it.id === id) {
            it.clicked = clicked;
        }
        else updateFolder(it.children, id, clicked)
    });
}

export const createFolder = (folderList, directoryId, target) => {
    let result;
    folderList.forEach((it) => {
        if(it.id === directoryId) {
            result=it;
        }
        else createFolder(it.children, directoryId, target);
    });

    if(result) result.children.push(target);
}

export const deleteFolder = (Folder, targetId) => {
    Folder.children = Folder.children.filter((it) => it.id !== targetId);
    Folder.children.forEach((it) => deleteFolder(it, targetId));
}