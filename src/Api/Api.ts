const localHost = "http://localhost:4000";

const API: any = {
  addTodo: (payload: {
    address: string;
    category: string;
    city: string;
    contacts: string;
    text: string;
    type: string;
    numberInList: number;
  }) => {
    return fetch(`${localHost}/todo/todo/addtask`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },
  fetchTodo: () => {
    return fetch(`${localHost}/todo/todo/fetchtodo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":
          " http://localhost:4000/todo/todo/fetchtodo",
      },
    });
  },
  toggleTodo: (payload: {
    id: string;
    status: boolean;
    numberTodo: number;
  }) => {
    return fetch(`${localHost}/todo/todo/toggletodo/:${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:4000/todo/todo/toggletodo/${payload.id}`,
      },
      body: JSON.stringify({
        id: payload.id,
        status: payload.status,
        numberTodo: payload.numberTodo,
      }),
    });
  },
  showModal: (payload: { id: string; modalStatus: boolean }) => {
    return fetch(`${localHost}/todo/todo/showmodaltodo/:${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `http://localhost:4000/todo/todo/showmodaltodo/${payload.id}`,
      },
      body: JSON.stringify({
        id: payload.id,
        modalStatus: payload.modalStatus,
      }),
    });
  },
};

export default API;
