import rootReducer from "./Reducer/combinedReducer";

import { createStore } from "redux";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // using the redux dev tool extension to inspect the state and action in Redux store
); // creating a centralized store

export default store;
