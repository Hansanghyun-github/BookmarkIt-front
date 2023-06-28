import { Link, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import Bookmarks from './pages/Bookmarks';
import React, { useEffect, useReducer, useRef } from 'react';

const mockBookmarks = [
  {
      id: 0,
      url: "www.google.com",
      explantion: "구글",
  },
  {
      id: 1,
      url: "www.naver.com",
      explantion: "네이버",
  },
  {
      id: 2,
      url: "www.bing.com",
      explantion: "빙",
  },
];

const mockFolders = [
  {
      name: "root",
      id: 0,
      children: [
          {
              name: "mine1",
              id: 1,
              children: [
                  {
                      name: "hello world",
                      id: 2,
                      children: []
                  },
              ]
          },
          {
              name: "mine2",
              id: 3,
              children: []
          },
      ]
  },
  {
      name: "study",
      id: 4,
      children: []
  },
  {
      name: "game",
      id: 5,
      children: [
          {
              name: "zelda",
              id: 6,
              children: []
          },
          {
              name: "fall guyz",
              id: 7,
              children: []
          },
      ]
  },
];

function reducerBookmark(state, action) {
  switch(action.type){
    case "CREATE":{
      return [action.data, ...state];
    }
    case "UPDATE":{
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE":{
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT":
      return action.data;
    default:
        return state;
  }
}

function reducerFolder(state, action) {
  switch(action.type){
    case "CREATE":{
      return [action.data, ...state];
    }
    case "UPDATE":{
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? {...action.data} : it
      );
    }
    case "DELETE":{
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT":
      return action.data;
    default:
        return state;
  }
}

export const BookmarkStateContext = React.createContext();
export const FolderStateContext = React.createContext();
export const DispatchContext = React.createContext();

function App() {
  const [bookmarks, dispatchBookmark] = useReducer(reducerBookmark, []);
  const [folders, dispatchFolder] = useReducer(reducerFolder, []);

  const idRef = useRef(10);

  useEffect(() => {
    dispatchBookmark({
      type:"INIT",
      data:mockBookmarks,
    });
    dispatchFolder({
      type:"INIT",
      data:mockFolders,
    });
  }, []);

  const onCreateBookmark = (id, url, explantion) => {
    dispatchBookmark({
      type: "CREATE",
      data: {
        id: idRef.current,
        url,
        explantion,
        clicked: 0,
      }
    });
    idRef.current += 1;
  };

  const onCreateFolder = (id, name) => {
    dispatchFolder({
      type:"CREATE",
      data:{
        id: idRef.current,
        name
      }
    });
    idRef.current += 1;
  };

  const onUpdateBookmark = (targetId, url, explantion) => {
    dispatchBookmark({
      type:"UPDATE",
      data:{
        id: targetId,
        url,
        explantion,
      },
    })
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
    dispatchBookmark({
      type:"DELETE",
      targetId,
    });
  };
  
  const onDeleteFolder = (targetId) => {
    dispatchFolder({
      type:"DELETE",
      targetId,
    });
  };

  return (
    <div className="App">
      <BookmarkStateContext.Provider value={bookmarks}>
        <FolderStateContext.Provider value={folders}>
          <DispatchContext.Provider 
           value={{
            onCreateBookmark, onCreateFolder,
            onUpdateBookmark, onUpdateFolder,
            onDeleteBookmark, onDeleteFolder,
           }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/bookmarks" element={<Bookmarks />} />
            </Routes>
           </DispatchContext.Provider>
        </FolderStateContext.Provider>
      </BookmarkStateContext.Provider>
    </div>
  );
}

export default App;
