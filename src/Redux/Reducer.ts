import {
  ADD_TODO,
  TOGGLE_TODO,
  FETCH_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  TOGGLE_TODO_SUCCESS,
  SHOW_MODAL,
  SHOW_MODAL_SUCCESS,
} from "../Constants/ActionsConst";
import { IReducerAct } from "../types";

const initialState = {
  todoList: [],
};
const todo: any = (state = initialState, action: IReducerAct) => {
  switch (action.type) {
    case ADD_TODO: {
      return { ...state, todoList: action.payload };
    }
    case FETCH_TODO_SUCCESS: {
      return { ...state, todoList: action.payload };
    }
    case TOGGLE_TODO: {
      return { ...state, todoList: action.payload };
    }
    case SHOW_MODAL: {
      return { ...state, todoList: action.payload };
    }
    case TOGGLE_TODO_SUCCESS: {
      return { ...state, todoList: action.payload };
    }
    case GET_TODO_SUCCESS: {
      return { ...state, todoList: action.payload };
    }
    case SHOW_MODAL_SUCCESS: {
      return { ...state, todoList: action.payload };
    }
    default:
      return state;
  }
};

export default todo;
