import { call, put, takeEvery } from "redux-saga/effects";
import API from "../Api/Api";
import {
  ADD_TODO,
  FETCH_TODO,
  FETCH_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  SHOW_MODAL,
  SHOW_MODAL_SUCCESS,
  TOGGLE_TODO,
  TOGGLE_TODO_SUCCESS,
} from "../Constants/ActionsConst";
import { ITodo } from "../types";

function* addList(action: any) {
  try {
    yield call(API.addTodo, action.payload);
    yield call(getTodos, action, GET_TODO_SUCCESS);
  } catch (error) {
    console.log("🚀 ~ file: list.js:15 ~ function*addList ~ error", error);
  }
}

function* getTodos(action: any, Reducer: any): any {
  const res = yield call(API.fetchTodo, JSON.stringify(action.payload));
  try {
    const todoList = yield res.json();

    const payload = todoList.map((item: any) => {
      return {
        ...item,
        id: item._id,
      };
    });
    payload.map((item: any) => delete item._id);

    yield put({ type: Reducer, payload });
  } catch (err) {
    console.log("🚀 ~ file: list.js:35 ~ function*getTodos ~ err", err);
  }
}

function* fetchTodo(action: any) {
  try {
    yield call(getTodos, action, FETCH_TODO_SUCCESS);
  } catch (err) {
    console.log("🚀 ~ file: lists.js ~ line 40 ~ err", err);
  }
}

function* toggleTodo(action: any) {
  try {
    yield call(API.toggleTodo, action.payload);
    yield call(getTodos, action, TOGGLE_TODO_SUCCESS);
  } catch (error) {
    console.log("🚀 ~ file: list.js:60 ~ error", error);
  }
}

function* showModal(action: any) {
  try {
    yield call(API.showModal, action.payload);
    yield call(getTodos, action, SHOW_MODAL_SUCCESS);
  } catch (error) {
    console.log("🚀 ~ file: list.js:64 ~ function*showModal ~ error", error);
  }
}

function* watchAddTodo() {
  yield takeEvery(ADD_TODO, addList);
}
function* watchFetchTodo() {
  yield takeEvery(FETCH_TODO, fetchTodo);
}

function* watchToggleTodo() {
  yield takeEvery(TOGGLE_TODO, toggleTodo);
}
function* watchShowModal() {
  yield takeEvery(SHOW_MODAL, showModal);
}

export default [
  watchAddTodo(),
  watchFetchTodo(),
  watchToggleTodo(),
  watchShowModal(),
];
