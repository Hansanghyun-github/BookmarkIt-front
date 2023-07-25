import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';
import React, { useEffect, useReducer } from 'react';
import { createFolder, deleteFolder, updateFolder } from './util';
import axios from 'axios';
import { reducerUpdateDisplay,reducerCreateDisplay } from './reducerFunction/reducerDisplay';

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
      console.log("-------------- setting finished --------------");
      let rootFolder = JSONFolders.find((it) => it.name === "root");
      console.log(rootFolder);
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

      //console.log("after clicked");

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
    axios.get("http://localhost:8080/bookmarks")
    .then((response) => {
        console.log(response.data);
        const data=response.data;
        dispatchBookmark({
          type:"INIT",
          data:data.bookmarks,
        });
        dispatchFolder({
          type:"INIT",
          data:data.directories,
        });
    })
    .catch((error) => {
        console.log(error);
    });
  }, []);

  useEffect(() => {
    dispatchBookmark({
      type:"CHANGE",
      clickedFolderId,
      data: JSONBookmarks,
    })
  }, [folders]);

  const onCreateBookmark = (url, bookmarkName) => {
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
              'Accept': 'application/json' 
          }
    })
    .then((response) => {
      console.log("create bookmark " + response.data);
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
        console.log(error);
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

  const onCreateFolder = (folderName) => {
    axios.post(
      "http://localhost:8080/directories",
      {
        name: folderName,
        prevDirectoryId: clickedFolderId
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json' 
          }
    })
    .then((response) => {
      console.log("create folder " + response.data);
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
        console.log(error);
        dispatchCreateDisplay({
          type: "errorFolder",
          data: {
            folderName: folderName,
            errorFolderName: error.response.data.fieldErrors.name
          }
        });
    });
  };

  const onUpdateBookmark = (targetId, url, bookmarkName, directoryId) => {
    console.log("update start");
    axios.post(
      "http://localhost:8080/bookmarks/"+targetId,
      {
        url: url,
        name: bookmarkName
      },
      {
          headers:{
              'Content-type': 'application/json', 
              'Accept': 'application/json' 
          }
    })
    .then((response) => {
      console.log("update bookmark " + response.data);
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
        console.log(error);
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

  const onUpdateFolder = (targetId, name) => {
    dispatchFolder({
      type:"UPDATE",
      data:{
        id: targetId,
        name,
      },
    })
  }
  
  const onDeleteBookmark = (targetId) => {
    axios.delete("http://localhost:8080/bookmarks/"+targetId)
    .then((response) => {
      console.log("delete bookmark " + response.data);
      dispatchBookmark({
        type:"DELETE",
        targetId,
      });
    })
    .catch((error) => {
        console.log(error);
    });
  };
  
  const onDeleteFolder = (targetId) => {
    axios.delete("http://localhost:8080/directories/"+targetId)
    .then((response) => {
      console.log("delete bookmark " + response.data);
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
        console.log(error);
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
