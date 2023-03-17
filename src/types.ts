export interface ITodo {
  address: string;
  category: string;
  city: string;
  contacts: string;
  date: string;
  id: string;
  modalStatus: boolean;
  numberInList: number;
  numberTodo: number;
  status: boolean;
  text: string;
  type: string;
}

export interface ICompModal {
  statusClosedModal: boolean;
  changeStatusClosedModal: () => void;
  item: ITodo;
}

export interface IModWindowItem {
  itemModalStatus: boolean;
  handleCloseItemWindow: () => void;
  item: ITodo | undefined;
  setItemModalStatus: any;
}

export interface IModToDoReq {
  statusModalCloseToDoRequest: boolean;
  handleCloseStatusModalCloseToDoRequest: () => void;
  item: ITodo | undefined;
}

export interface IModWindow {
  modalStatus: boolean;
  handleClose: () => void;
  dataCategory: string[];
  listCities: string[];
}

export interface IButton {
  variant: any;
  color: any;
  size: any;
  onClick: () => void;
  fullWidth: boolean;
  name: string;
}

export interface IReducerAct {
  payload: {
    address: string;
    category: string;
    city: string;
    contacts: string;
    date: string;
    id: string;
    modalStatus: boolean;
    numberInList: number;
    numberTodo: number;
    status: boolean;
    text: string;
    type: string;
  };
  type: any;
}
