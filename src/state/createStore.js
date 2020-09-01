import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
let socket = io("https://sld-clicker.herokuapp.com/"); //io("http://localhost:3000/")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const DEVELOPMENT = false;

function reducer(
  state = {
    donationActive: false,
    count: 0,
    polls: [],
  },
  action
) {
  switch (action.type) {
    case "donation": {
      return Object.assign(
        {},
        { ...state, donationActive: true, donation: action.data }
      );
    }
    case "donationEnds": {
      return Object.assign(
        {},
        { ...state, donationActive: false, donation: undefined }
      );
    }
    case "userCount":
      return Object.assign({}, { ...state, count: action.data });
    case "pollUpdate": {
      return Object.assign({}, { ...state, polls: action.data });
    }
    default:
      return state;
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(() => {
  if (DEVELOPMENT) {
    console.log("new client state", store.getState());
  }
});

export default store;
