import "./Styles.scss";
import { useEffect, useState, useMemo } from "react";
import Header from "./Header/Header";
import ModalWindow from "./Modal/ModalWindow";
import ItemModalWindow from "./Modal/ItemModalWindow";
import city from "./Constants/cities";
import dataCategory from "./Constants/dataCategory";
import dataStatus from "./Constants/dataStatus";
import CompletedModal from "./Modal/CompletedModal";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  todoListSelector,
  selectTodoListByFilter,
} from "./Selectors/CreateSelectors";
import ItemPlacedSuccess from "./Modal/ItemPlacedSuccess";
import { fetchTodo } from "./Actions/ActionsTodo";
import BtnComponent from "./Button/Button";
import { ITodo } from "./types";

function MainList() {
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [itemModalStatus, setItemModalStatus] = useState<boolean>(false);
  const [statusClosedModal, setStatusClosedModal] = useState<boolean>(false);
  const [tempTodo, setTempTodo] = useState<ITodo>();
  const [listCities] = useState<string[]>(city);
  const [categoryFilter, setCategoryFilter] = useState<string>("Усі категорії");
  const [citiesFilter, setCitiesFilter] = useState<string>("Усі міста");
  const [statusFilter, setStatusFilter] = useState<string>("Усі статуси");

  const TODO = useSelector(todoListSelector);

  const handleChangeCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategoryFilter(event.target.value);
  };
  const handleChangeCities = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCitiesFilter(event.target.value);
  };
  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value);
  };

  const changeStatusClosedModal = () => {
    setStatusClosedModal(false);
  };

  const handleClose = () => {
    setModalStatus(false);
  };
  const handleCloseItemWindow = () => {
    setItemModalStatus(false);
  };
  const handleOnClickButton = () => {
    setModalStatus(!modalStatus);
  };

  const handleClickOnList = (item: ITodo) => {
    setTempTodo(item);
    if (item.status) {
      setStatusClosedModal(!statusClosedModal);
    } else {
      setItemModalStatus(!itemModalStatus);
      window.scrollTo(0, 0);
    }
  };

  const FilteredList = useSelector(
    selectTodoListByFilter(categoryFilter, citiesFilter, statusFilter)
  );

  const todoFilteredMas = useMemo(() => {
    return FilteredList;
  }, [categoryFilter, citiesFilter, statusFilter, TODO]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  return (
    <div className="main">
      <img
        className="ukraineFlag"
        alt="Ukraine"
        src="ukraine.png"
        height={48}
        width={50}
      />
      <div className="App">
        <Header count={TODO} />
        <div>
          <form className="DropDown-List">
            <select onChange={handleChangeCategory}>
              <option>Усі категорії</option>
              {dataCategory.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
            <select onChange={handleChangeCities}>
              <option>Усі міста</option>
              {listCities.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
            <select onChange={handleChangeStatus}>
              {dataStatus.map((item, index) => {
                return <option key={index}>{item}</option>;
              })}
            </select>
          </form>
        </div>
        <div className="createButton">
          <BtnComponent
            variant="contained"
            color="success"
            size="large"
            onClick={handleOnClickButton}
            fullWidth={true}
            name="Створити запит"
          />
        </div>
        <div className="todoItem">
          <ul>
            {FilteredList?.length > 0 ? (
              todoFilteredMas.map((item: ITodo) => {
                return (
                  <>
                    {
                      <li
                        key={item.numberInList}
                        onClick={() => {
                          handleClickOnList(item);
                        }}
                      >
                        <div className="cityText">
                          {item.city}: {item.text}
                          <br></br>
                          {item.category === "Допомога військовим" ? (
                            <p className="millitaryHelp">
                              Допомога військомим!!!
                            </p>
                          ) : (
                            <></>
                          )}
                          {item.type.includes("Я волонтер") ? (
                            <p className="volonteerHelp">
                              Волонтер хочу допомогти !!!
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div>
                          {item.status ? (
                            <p className="statusComplete">Вирішено</p>
                          ) : (
                            <p className="statusNotComplete">Актуально</p>
                          )}
                        </div>
                      </li>
                    }
                  </>
                );
              })
            ) : (
              <>
                <p>
                  Зараз немає запитів за вказаними критеріями, ви можете додати
                  і він з'явиться тут.
                </p>
                <p>
                  Інформація оновлюється автоматично, нові запити з'являться як
                  тільки будуть додані.
                </p>
              </>
            )}
          </ul>
        </div>{" "}
        {tempTodo?.status ? (
          <CompletedModal
            changeStatusClosedModal={changeStatusClosedModal}
            statusClosedModal={statusClosedModal}
            item={tempTodo}
          />
        ) : (
          <ItemModalWindow
            itemModalStatus={itemModalStatus}
            handleCloseItemWindow={handleCloseItemWindow}
            item={tempTodo}
            setItemModalStatus={setItemModalStatus}
          />
        )}
        <ModalWindow
          modalStatus={modalStatus}
          handleClose={handleClose}
          dataCategory={dataCategory}
          listCities={listCities}
        />
        <ItemPlacedSuccess />
      </div>
      <img
        className="united24Logo"
        src="united24.png"
        alt="UNITED24"
        width={250}
        height={230}
      />
    </div>
  );
}

export default connect(null, null)(MainList);
