import { Modal } from "@mui/material";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo } from "../Actions/ActionsTodo";
import Input from "@mui/material/Input";
import BtnComponent from "../Button/Button";
import { IModToDoReq } from "../types";
const ModalToDoRequest = (props: IModToDoReq) => {
  const style = {
    margin: "auto",
    position: "absolute",
    top: "40%",
    width: 300,
  };
  const {
    statusModalCloseToDoRequest,
    handleCloseStatusModalCloseToDoRequest,
    item,
  } = props;
  const [secretNumber, setSecretNumber] = useState(0);
  const dispatch = useDispatch();

  const onChangeInput = (e: any) => {
    setSecretNumber(Number(e.target.value));
  };

  const handleSaveToDo = useCallback(() => {
    if (item?.numberTodo === secretNumber) {
      dispatch(toggleTodo(item.id, item.status, item.numberTodo));
      handleCloseStatusModalCloseToDoRequest();
    } else {
      alert("Код не вірний(");
      handleCloseStatusModalCloseToDoRequest();
    }
  }, [
    secretNumber,
    item?.id,
    item?.status,
    item?.numberTodo,
    dispatch,
    handleCloseStatusModalCloseToDoRequest,
  ]);
  return (
    <Modal
      sx={{ ...style }}
      open={statusModalCloseToDoRequest || false}
      onClose={handleCloseStatusModalCloseToDoRequest}
    >
      <div className="ModalToDoRequest">
        <div className="newRecord">
          <div>
            <p>Зміна запису</p>
          </div>
        </div>
        <p>Код зміни статусу</p>

        <Input type="number" autoFocus={true} onChange={onChangeInput}></Input>

        <br />
        <div className="modalButtons">
          <BtnComponent
            variant="contained"
            color="success"
            size="medium"
            onClick={handleSaveToDo}
            fullWidth={false}
            name="Зберегти"
          />

          <BtnComponent
            variant="outlined"
            color="error"
            size="medium"
            onClick={handleCloseStatusModalCloseToDoRequest}
            fullWidth={false}
            name="Закрити"
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalToDoRequest;
