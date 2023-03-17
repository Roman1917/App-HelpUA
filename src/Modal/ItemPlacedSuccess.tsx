import { Modal, Button } from "@mui/material";
import Input from "@mui/material/Input";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../Actions/ActionsTodo";
import { todoListSelector } from "../Selectors/CreateSelectors";
const ItemPlacedSuccess = () => {
  const style = {
    margin: "auto",
    position: "absolute",
    top: "15%",
    width: "350px",
  };
  const todos = useSelector(todoListSelector);
  const variable = todos[todos.length - 1];

  const dispatch = useDispatch();
  const handleClosePlacedSuccess = () => {
    dispatch(showModal(variable.id, variable.modalStatus));
  };

  return (
    <Modal
      sx={{ ...style }}
      open={variable?.modalStatus || false}
      onClose={handleClosePlacedSuccess}
    >
      <div className="ModalToDoRequest">
        <h2>Запит № #{variable?.numberInList}</h2>
        <h2>За {variable?.date}</h2>
        <p>
          Ваш запит успішно опублікований та доступний у спільній стрічці, а
          також за посиланням нижче{" "}
        </p>
        <h3>Посилання...</h3>
        <p>Код зміни статусу</p>

        <Input
          type="number"
          defaultValue={variable?.numberTodo}
          color="primary"
          readOnly={true}
        ></Input>
        <p>
          Код зміни статусу - зробіть скріншот або збережіть його щоб ви або
          хтось інший мали змогу закрити цей запит після виконання
        </p>
        <br />

        <div className="modalButtons">
          <Button
            variant="outlined"
            color="error"
            onClick={handleClosePlacedSuccess}
          >
            Закрити
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ItemPlacedSuccess;
