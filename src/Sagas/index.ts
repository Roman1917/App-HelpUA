import { all } from "redux-saga/effects";
import listsagas from "./list";

function* rootSaga() {
  yield all([...listsagas]);
}

export default rootSaga;
