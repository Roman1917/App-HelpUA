import { Modal } from "@mui/material";
import ModalToDoRequest from "./ModalToDoRequest";
import { useEffect, useState } from "react";
import BtnComponent from "../Button/Button";
import { IModWindowItem } from "../types";
const ItemModalWindow = (props: IModWindowItem) => {
  const style = {
    margin: "auto",
    position: "absolute",
    top: "30%",
    width: 500,
    overflow: "auto",
    overflowX: "hidden",
  };
  const { itemModalStatus, handleCloseItemWindow, item, setItemModalStatus } =
    props;

  const [statusModalCloseToDoRequest, setStatusModalCloseToDoRequest] =
    useState<boolean>(false);

  const handleSetItemModalStatus = () => {
    setItemModalStatus(!itemModalStatus);
  };

  const handleSetStatusComplete = () => {
    handleSetItemModalStatus();
    setStatusModalCloseToDoRequest(true);
  };

  const handleCloseStatusModalCloseToDoRequest = () => {
    setStatusModalCloseToDoRequest(false);
  };
  const onKeydown = ({ key }: any) => {
    switch (key) {
      case "Escape":
        handleCloseItemWindow();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  });

  return (
    <>
      <Modal
        sx={{ ...style }}
        open={itemModalStatus || false}
        onClose={handleCloseItemWindow}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {item?.status ? (
            <div className="itemModalWindow">
              <h2>Запит № {item.numberInList}</h2>
              <h2>За {item.date}</h2>
              <p>{item.text}</p>
            </div>
          ) : (
            <div>
              <div className="itemModalWindow">
                <h2>Запит № #{item?.numberInList}</h2>

                <h2>За {item?.date}</h2>
                <p>{item?.text}</p>
                <p>
                  <span>Контакти:</span>
                  {item?.contacts}
                </p>
                <p className="alert">
                  <span>Увага!</span> Щоб уникнути шахрайства, просіть фото та
                  інші докази. Не надсилайте гроші без впевненості. Якщо людина
                  щось приховує - це шахраї.
                </p>
                <div>Посилання...</div>
                <div className="itemButtons">
                  <BtnComponent
                    variant="contained"
                    color="success"
                    size="medium"
                    onClick={handleSetStatusComplete}
                    fullWidth={false}
                    name="Виконати"
                  />

                  <BtnComponent
                    variant="outlined"
                    color="error"
                    size="medium"
                    onClick={handleSetItemModalStatus}
                    fullWidth={false}
                    name="Закрити"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      </Modal>
      <ModalToDoRequest
        statusModalCloseToDoRequest={statusModalCloseToDoRequest}
        handleCloseStatusModalCloseToDoRequest={
          handleCloseStatusModalCloseToDoRequest
        }
        item={item}
      />
    </>
  );
};
export default ItemModalWindow;
