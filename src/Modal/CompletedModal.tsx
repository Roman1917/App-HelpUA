import { Modal } from "@mui/material";
import BtnComponent from "../Button/Button";
import { ICompModal } from "../types";

const CompletedModal = (props: ICompModal) => {
  const { statusClosedModal, changeStatusClosedModal, item } = props;
  const style = {
    margin: "auto",
    position: "absolute",
    top: "30%",
    width: 500,
    overflow: "auto",
    overflowX: "hidden",
  };
  return (
    <Modal
      sx={{ ...style }}
      open={statusClosedModal || false}
      onClose={changeStatusClosedModal}
    >
      <div className="itemModalWindow">
        <h2>Запит № #{item.numberInList}</h2>
        <h2>За {item.date}</h2>
        <p>{item.text}</p>
        <div className="itemButtons">
          <BtnComponent
            variant="outlined"
            color="error"
            size="large"
            onClick={changeStatusClosedModal}
            fullWidth={false}
            name="  Закрити"
          />
        </div>
      </div>
    </Modal>
  );
};
export default CompletedModal;
