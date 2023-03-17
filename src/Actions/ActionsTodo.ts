import {
  ADD_TODO,
  TOGGLE_TODO,
  FETCH_TODO,
  SHOW_MODAL,
} from "../Constants/ActionsConst";

export const addTodo = (
  address: string,
  category: string,
  city: string,
  contacts: string,
  text: string,
  type: string,
  numberInList: number
) => ({
  type: ADD_TODO,
  payload: {
    address: address,
    category: category,
    city: city,
    contacts: contacts,
    text: text,
    type: type,
    numberInList: numberInList,
  },
});

export const toggleTodo = (
  id: string,
  status: boolean,
  numberTodo: number
) => ({
  type: TOGGLE_TODO,
  payload: {
    id: id,
    status: status,
    numberTodo: numberTodo,
  },
});

export const fetchTodo = () => ({
  type: FETCH_TODO,
});

export const showModal = (id: string, modalStatus: boolean) => ({
  type: SHOW_MODAL,
  payload: {
    id: id,
    modalStatus: modalStatus,
  },
});
