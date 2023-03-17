import { createRoot } from "react-dom/client";

import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import todo from "./Redux/Reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootSaga from "./Sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  todo,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
);

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
export default store;
sagaMiddleware.run(rootSaga);
