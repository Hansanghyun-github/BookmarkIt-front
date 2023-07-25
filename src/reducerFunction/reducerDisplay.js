export function reducerUpdateDisplay(state, action) {
  switch(action.type){
    case "clickBookmark":
      return {
                messages: {
                            url: state.messages.url,
                            bookmarkName: state.messages.bookmarkName
                          },
                isOpen: true,
                url: action.data.url,
                bookmarkName: action.data.bookmarkName,
             }
    case "close":
      return {
                messages: {},
                isOpen: false,
                url: "",
                bookmarkName: "",
             };
    case "errorBookmark":
      return {
                messages: {
                            url:action.data.errorUrl,
                            bookmarkName: action.data.errorBookmarkName
                          },
                isOpen: true,
                url: action.data.url,
                bookmarkName: action.data.bookmarkName,
             };
    default:
      return {};
  }
};

export function reducerCreateDisplay (state, action) {
    switch(action.type){
      case "clickBookmark":
        return {
                  messages: {
                              url: state.messages.url,
                              bookmarkName: state.messages.bookmarkName
                            },
                  isOpenB: true,
                  isOpenF: false,
                  url: action.data.url,
                  bookmarkName: action.data.bookmarkName,
                  folderName: "",
               }
      case "clickFolder":
        return {
                  messages: {
                              folderName: state.messages.folderName
                            },
                  isOpenB: false,
                  isOpenF: true,
                  url: "",
                  bookmarkName: "",
                  folderName: action.data.folderName,
              }
      case "close":
        return {
                  messages: {},
                  isOpenB: false,
                  isOpenF: false,
                  url: "",
                  bookmarkName: "",
                  folderName: "",
               };
      case "errorBookmark":
        return {
                  messages: {
                              url:action.data.errorUrl,
                              bookmarkName: action.data.errorBookmarkName
                            },
                  isOpenB: true,
                  isOpenF: false,
                  url: action.data.url,
                  bookmarkName: action.data.bookmarkName,
                  folderName: "",
               };
      case "errorFolder":
        return {
                  messages: {
                              folderName: action.data.errorFolderName
                            },
                  isOpenB: false,
                  isOpenF: true,
                  url: "",
                  bookmarkName: "",
                  folderName: action.data.folderName,
               }
      default:
        return {};
    }
  }