import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';
import React, { useEffect, useReducer } from 'react';
import { createFolder, deleteFolder, updateFolder } from './util';
import axios from 'axios';
import { reducerUpdateDisplay,reducerCreateDisplay } from './reducerFunction/reducerDisplay';
import base64 from 'base-64';

let JSONBookmarks = [];

let JSONFolders = [];

let clickedBookmarkId = -1;
let clickedFolderId = -1;
let rootFolderId = -1;

export function settingFolders(folders) {
  let check=[];
  folders.forEach((it) => {
    if(it.id === it.prevDirectoryId){
      JSONFolders.push({id:it.id, name:it.name, children:[], clicked: 0});
    }
    else {
      check.push(it);
    }
  })

  check.forEach((it)=>{
    createFolder(JSONFolders, it.prevDirectoryId, {id:it.id, name:it.name, children:[], clicked: 0});
  })
};

function reducerBookmark(state, action) {
  switch(action.type){
    case "CREATE":{
      // 서버로 JSON 보내고 OK 받으면
      JSONBookmarks.push(action.data);
      return JSONBookmarks.filter((it) => it.directoryId === clickedFolderId);
    }
    case "UPDATE":{
      // 서버로 JSON 보내고 OK 받으면
      JSONBookmarks = JSONBookmarks.map((it) =>
      String(it.id) === String(action.data.id) ? {...action.data} : it );

      return JSONBookmarks.filter((it) => it.directoryId === clickedFolderId);
    }
    case "DELETE":{
      // 서버로 JSON 보내고 OK 받으면
      JSONBookmarks = JSONBookmarks.filter((it) => it.id !== action.targetId);
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT":{
      action.data.forEach((it) => {
        JSONBookmarks.push({id: it.id, url: it.url, explantion: it.name, directoryId: it.directoryId});
      })
      // 서버로 JSON 보내고 OK 받으면
      return action.data;
    }
    case "CLICK":{
      let tempBookmarks = JSON.parse(JSON.stringify(state));
      if(clickedBookmarkId !== -1)
        tempBookmarks.find((it) => it.id === clickedBookmarkId).clicked = 0;
      tempBookmarks.find((it) => it.id === action.targetId).clicked = 1;

      clickedBookmarkId = action.targetId;
      return tempBookmarks;
    }
    case "CHANGE":{
      return action.data.filter((it) => it.directoryId === action.clickedFolderId);
    }
    default:
        return state;
  }
}

function reducerFolder(state, action) {
  switch(action.type){
    case "CREATE":{
      // 서버로 JSON 보내고 OK 받으면
      createFolder(JSONFolders, action.clickedFolderId, action.data);
      return JSONFolders;
    }
    case "UPDATE":{
      return state;
    }
    case "DELETE":{
      // 서버로 JSON 보내고 OK 받으면 TODO
      JSONFolders = JSONFolders.filter((it) => it.id !== action.targetId);
      JSONFolders.forEach((it) => deleteFolder(it, action.targetId));
      return JSONFolders;
    }
    case "INIT":{
      settingFolders(action.data);
      let rootFolder = JSONFolders.find((it) => it.name === "root");
      rootFolder.clicked = 1;
      rootFolderId = rootFolder.id;
      clickedFolderId = rootFolderId;


      return JSONFolders;
    }
    case "CLICK":{
      let tempFolders = JSON.parse(JSON.stringify(JSONFolders));
      updateFolder(tempFolders, clickedFolderId, 0);
      updateFolder(tempFolders, action.targetId, 1);
      clickedFolderId = action.targetId;
      clickedBookmarkId = -1;
      JSONFolders = tempFolders;

      return JSONFolders;
    }
    default:
        return state;
  }
}

export const BookmarkStateContext = React.createContext();
export const FolderStateContext = React.createContext();
export const DispatchContext = React.createContext();

export const CreateDisplayContext = React.createContext();
export const UpdateDisplayContext = React.createContext();

function App() {
  const navigate = useNavigate();

  const [bookmarks, dispatchBookmark] = useReducer(reducerBookmark, []);
  const [folders, dispatchFolder] = useReducer(reducerFolder, []);

  const [createDisplay, dispatchCreateDisplay] = useReducer(reducerCreateDisplay
    , {
        messages: {},
        isOpenB: false,
        isOpenF: false,
        url: "",
        bookmarkName: "",
        folderName: ""
      });
  const [updateDisplay, dispatchUpdateDisplay] = useReducer(reducerUpdateDisplay
    , {
        messages: {},
        isOpenB: false,
        isOpenF: false,
        url: "",
        bookmarkName: "",
        folderName: ""
      });

  useEffect(() => {
    dispatchBookmark({
      type:"CHANGE",
      clickedFolderId,
      data: JSONBookmarks,
    })
  }, [folders]);

  const toLogin = (username, password) => {
    axios.post(
      "http://localhost:8080/login",
      {
        username,
        password,
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json' 
          }
    })
    .then((response) => {
      console.log('login suceess');
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      navigate("/bookmarks");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  const toLogout = async () => {
    await checkTokenExpiredAndGetAgain();
    await axios.post("http://localhost:8080/api/auth/logout",{},{
      headers:{
        'Authorization': localStorage.getItem('jwtToken')
      }})
    .then((response) => {

    })
    .catch((error) => console.log(error.response.data));
    localStorage.setItem("jwtToken", "");
    localStorage.setItem("refreshToken", "");
    navigate("/login");
  }

  const toJoin = (username, password) => {
    axios.post(
      "http://localhost:8080/api/auth/join",
      {
        username,
        password,
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json' 
          }
    })
    .then((response) => {
      console.log(response.data);
      navigate("/login");
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  }

  async function isDuplicate(username) {
    try{
      const result = await axios.post("http://localhost:8080/api/auth/duplicate", {username})
      return Boolean(result.data);
    } catch(error){
      return true;
    }
  }

  async function getJwtTokenAgain() {
    let result;
    try{
      result = await axios.post(
        "http://localhost:8080/api/auth/refreshtoken",
      {
        refreshToken: localStorage.getItem('refreshToken')
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json' 
          }
      })
    } catch(error){
      console.log(error.response.data);
    }
    return result;
  }

  const checkTokenExpiredAndGetAgain = async () => {
    let token = localStorage.getItem('jwtToken');
    let payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.')); 
    let dec = JSON.parse(base64.decode(payload));
    if(dec.exp - Date.now()/1000 < 0) { // token was expired
      console.log("token was expired");
      
      const result = await getJwtTokenAgain();
      localStorage.setItem('jwtToken', result.data.token);
      localStorage.setItem('refreshToken', result.data.refreshToken);
    };
  }
  
  const getAllBookmarksAndFolders = async () => {
    if(!localStorage.getItem("jwtToken")){
      console.log("have to authenticate");
      navigate("/login");
      return;
    }
    await checkTokenExpiredAndGetAgain();
    axios.get(
      "http://localhost:8080/bookmarks",
      {
        headers:{
          'Authorization': localStorage.getItem('jwtToken')
        }
      }
      )
    .then((response) => {
        const data=response.data;
        dispatchBookmark({
          type:"INIT",
          data:data.bookmarks,
        });
        dispatchFolder({
          type:"INIT",
          data:data.directories,
        });
        navigate("/bookmarks");
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  }

  const onCreateBookmark = async (url, bookmarkName) => {
    await checkTokenExpiredAndGetAgain();
    axios.post(
      "http://localhost:8080/bookmarks",
      {
        url: url,
        name: bookmarkName,
        directoryId: clickedFolderId
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('jwtToken')
          }
    })
    .then((response) => {
      const data = response.data;
      dispatchBookmark({
        type: "CREATE",
        data: {
          id: data.id,
          url: data.url,
          explantion: data.name,
          directoryId: clickedFolderId, // data.directoryId도 가능
          clicked: 0,
        },
      });
      dispatchCreateDisplay({
        type: "close"
      });
    })
    .catch((error) => {
        console.log(error.response.data);
        dispatchCreateDisplay({
          type: "errorBookmark",
          data: {
            url: url,
            bookmarkName: bookmarkName,
            errorUrl: error.response.data.fieldErrors.url,
            errorBookmarkName: error.response.data.fieldErrors.name
          }
        });
    });
  };

  const onCreateFolder = async(folderName) => {
    await checkTokenExpiredAndGetAgain();
    axios.post(
      "http://localhost:8080/directories",
      {
        name: folderName,
        prevDirectoryId: clickedFolderId
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('jwtToken')
          }
    })
    .then((response) => {
      const data = response.data;
      dispatchFolder({
        type:"CREATE",
        data:{
          id: data.id,
          name: data.name,
          clicked: 0,
          children: [],
        },
        clickedFolderId, // data.prevDirectoryId도 가능
      });
      dispatchFolder({
        type:"CLICK",
        targetId: data.id,
        name: folderName,
      });
      dispatchCreateDisplay({
        type: "close"
      });
    })
    .catch((error) => {
        console.log(error.response.data);
        dispatchCreateDisplay({
          type: "errorFolder",
          data: {
            folderName: folderName,
            errorFolderName: error.response.data.fieldErrors.name
          }
        });
    });
  };

  const onUpdateBookmark = async (targetId, url, bookmarkName, directoryId) => {
    await checkTokenExpiredAndGetAgain();
    axios.post(
      "http://localhost:8080/bookmarks/"+targetId,
      {
        url: url,
        name: bookmarkName
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('jwtToken')
          }
    })
    .then((response) => {
      dispatchBookmark({
        type:"UPDATE",
        data:{
          id: targetId,
          url,
          explantion: bookmarkName,
          directoryId,
        },
      })
    })
    .catch((error) => {
        console.log(error.response.data);
        dispatchUpdateDisplay({
          type: "errorBookmark",
          data: {
            url: url,
            bookmarkName: bookmarkName,
            errorUrl: error.response.data.fieldErrors.url,
            errorBookmarkName: error.response.data.fieldErrors.name
          }
        });
    });
  }

  const onUpdateFolder = async (targetId, name) => {
    await checkTokenExpiredAndGetAgain();
    dispatchFolder({
      type:"UPDATE",
      data:{
        id: targetId,
        name,
      },
    })
  }
  
  const onDeleteBookmark = async (targetId) => {
    await checkTokenExpiredAndGetAgain();
    axios.delete(
      "http://localhost:8080/bookmarks/"+targetId,
      {
        headers:{
          'Authorization': localStorage.getItem('jwtToken')
        }
      }
      )
    .then((response) => {
      dispatchBookmark({
        type:"DELETE",
        targetId,
      });
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  };
  
  const onDeleteFolder = async (targetId) => {
    await checkTokenExpiredAndGetAgain();
    axios.delete(
      "http://localhost:8080/directories/"+targetId,
      {
        headers:{
          'Authorization': localStorage.getItem('jwtToken')
        }
      }
      )
    .then((response) => {
      dispatchFolder({
        type:"CLICK",
        targetId: rootFolderId,
      });
  
      dispatchFolder({
        type:"DELETE",
        targetId,
      });
    })
    .catch((error) => {
        console.log(error.response.data);
    });
  };

  const onClickBookmark = (targetId) => {
    dispatchBookmark({
      type:"CLICK",
      targetId,
    });
  };

  const onClickFolder = (targetId) => {
    dispatchFolder({
      type:"CLICK",
      targetId,
    });
  };

  const onClickBookmarkDisplay = (url, bookmarkName) => {
    dispatchCreateDisplay({
      type: "clickBookmark",
      data: {
        url: url,
        bookmarkName: bookmarkName
      }
    })
  };

  const onClickFolderDisplay = (folderName) => {
    dispatchCreateDisplay({
      type: "clickFolder",
      data: {
        folderName: folderName,
      }
    })
  }

  const closeDisplay = () => {
    dispatchCreateDisplay({
      type: "close"
    })
  }

  const onClickBookmarkUpdate = (url, bookmarkName) => {
    dispatchUpdateDisplay({
      type: "clickBookmark",
      data: {
        url: url,
        bookmarkName: bookmarkName
      }
    })
  };

  const closeUpdateDisplay = () => {
    dispatchUpdateDisplay({
      type: "close"
    })
  }

  return (
    <div className="App">
      <BookmarkStateContext.Provider value={bookmarks}>
        <FolderStateContext.Provider value={folders}>
          <CreateDisplayContext.Provider value={createDisplay}>
            <UpdateDisplayContext.Provider value={updateDisplay}>
              <DispatchContext.Provider 
              value={{
                toLogin, toJoin, isDuplicate, toLogout,
                getAllBookmarksAndFolders,
                onCreateBookmark, onCreateFolder,
                onUpdateBookmark, onUpdateFolder,
                onDeleteBookmark, onDeleteFolder,
                onClickBookmark, onClickFolder,
                onClickBookmarkDisplay, onClickFolderDisplay,
                closeDisplay,
                onClickBookmarkUpdate, closeUpdateDisplay
              }}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/bookmarks" element={<Bookmarks/>} />
                </Routes>
              </DispatchContext.Provider>
            </UpdateDisplayContext.Provider>
           </CreateDisplayContext.Provider>
        </FolderStateContext.Provider>
      </BookmarkStateContext.Provider>
    </div>
  );
}

export default App;
