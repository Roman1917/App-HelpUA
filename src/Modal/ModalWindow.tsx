import { Modal, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { addTodo } from "../Actions/ActionsTodo";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { Field, Form } from "react-final-form";
import { useEffect } from "react";
import { todoListSelector } from "../Selectors/CreateSelectors";
import { IModWindow, ITodo } from "../types";
const ModalWindow = (props: IModWindow) => {
  const style = {
    margin: "auto",
    paddingRight: "75px",
    overflow: "auto",
    overflowX: "hidden",
  };
  const { modalStatus, handleClose, dataCategory, listCities } = props;

  const [city, setCity] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [contacts, setContacts] = useState<string>("");
  const [address, setAddress] = useState<string>(" ");
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const TODO = useSelector(todoListSelector);
  const numberInList = TODO.length;

  const dispatch = useDispatch();

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };
  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };
  const handleChangeText = (event: any) => {
    setText(event.target.value);
  };
  const handleChangeContacts = (event: any) => {
    setContacts(event.target.value);
  };
  const handleChangeAddress = (event: any) => {
    setAddress(event.target.value);
  };

  const handleSaveRequest = () => {
    if (city?.length > 0) {
      if (city && category && type && text && contacts && address !== "") {
        dispatch(
          addTodo(
            address,
            category,
            city,
            contacts,
            text,
            type,
            numberInList + 1
          )
        );

        setCity("");
        setCategory("");
        setType("");
        setText("");
        setContacts("");
        setAddress(" ");
        setDisableButton(true);
        handleClose();
      } else {
        alert("Не всі поля заповнені");
      }
    } else {
      alert("Поля не заповнені");
    }
  };

  const onHandleSubmit = () => {
    return undefined;
  };

  const minValue = (min: number) => (value: string) => {
    if (value === undefined || value.length >= min) {
      return undefined;
    } else {
      setDisableButton(true);
      return `Значення повинно бути більше ніж ${min} символів`;
    }
  };
  useEffect(() => {
    if (
      city &&
      category &&
      type &&
      text &&
      contacts &&
      address !== "" &&
      text.length >= 40 &&
      contacts.length >= 4 &&
      address.length >= 12
    ) {
      setDisableButton(false);
    }
  }, [city, category, type, text, contacts, address]);
  return (
    <>
      <Modal
        sx={{ ...style, width: 400 }}
        open={modalStatus || false}
        onClose={handleClose}
      >
        <div className="modalWindow">
          <div className="newRecord">
            <div>
              <p>Новий запис</p>
            </div>
          </div>

          <div>
            <Form
              onSubmit={onHandleSubmit}
              render={() => (
                <form onSubmit={onHandleSubmit} className="DropDown-List">
                  <p>Міста</p>

                  <select onChange={handleChangeCity}>
                    <option>Виберіть</option>
                    {listCities.map((item: any) => {
                      return (
                        <option>{item[0].toUpperCase() + item.slice(1)}</option>
                      );
                    })}
                  </select>
                  <p>Категорія</p>

                  <select onChange={handleChangeCategory}>
                    <option>Виберіть</option>
                    {dataCategory.map((item: any) => {
                      return <option>{item}</option>;
                    })}
                  </select>

                  <p>Тип</p>
                  <select onChange={handleChangeType}>
                    <option>Виберіть</option>
                    <option>Потрібна допомога</option>
                    <option>Я волонтер (хочу допомогти)</option>
                  </select>
                  <Field name="Text" validate={minValue(40)}>
                    {({ input, meta }) => (
                      <div onChange={handleChangeText}>
                        <label>Текст</label>
                        <TextareaAutosize
                          maxRows={12}
                          minRows={8}
                          {...input}
                          placeholder="Опишіть свій запит докладно"
                        />
                        {meta.error && meta.touched && (
                          <div style={{ color: "red" }}>{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="Contacts" validate={minValue(4)}>
                    {({ input, meta }) => (
                      <div onChange={handleChangeContacts}>
                        <p>Контакти</p>
                        <TextField
                          fullWidth={true}
                          type="text"
                          placeholder="Номер телефону, телеграм"
                          {...input}
                        />
                        {meta.error && meta.touched && (
                          <div style={{ color: "red" }}>{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="Address" validate={minValue(12)}>
                    {({ input, meta }) => (
                      <div onChange={handleChangeAddress}>
                        <p>Адреса</p>
                        <TextField
                          fullWidth={true}
                          type="text"
                          placeholder="Вулиця, будинок, номер квартири"
                          {...input}
                        />

                        {meta.error && meta.touched && (
                          <div style={{ color: "red" }}>{meta.error}</div>
                        )}
                      </div>
                    )}
                  </Field>
                </form>
              )}
            />
            <div className="modalButtons">
              <Button
                variant="contained"
                color="success"
                disabled={disableButton}
                onClick={handleSaveRequest}
              >
                Зберегти
              </Button>

              <Button
                variant="outlined"
                color="error"
                onClick={() => handleClose()}
              >
                Закрити
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default connect(null, null)(ModalWindow);
