import { createSelector } from "reselect";

export const todoListSelector = createSelector(
  (state: any) => state?.todoList,
  (todoList) => todoList
);

export const filter = createSelector(
  (state: any) => state?.todoList,
  (todoList) => todoList
);

export const selectTodoListByFilter = (
  categoryFilter: string,

  citiesFilter: string,

  statusFilter: string
) =>
  createSelector(filter, (item) => {
    if (
      categoryFilter === "Усі категорії" &&
      citiesFilter === "Усі міста" &&
      statusFilter === "Усі статуси"
    )
      return item;

    if (categoryFilter === "Усі категорії" && statusFilter === "Усі статуси") {
      return Array.isArray(item)
        ? item.filter((oneItem) => oneItem.city === citiesFilter)
        : item;
    }

    if (
      categoryFilter === "Усі категорії" &&
      citiesFilter === "Усі міста" &&
      statusFilter === "Тільки актуальні"
    ) {
      return Array.isArray(item)
        ? item.filter((oneItem) => oneItem.status === false)
        : item;
    }

    if (citiesFilter === "Усі міста" && statusFilter === "Усі статуси")
      return Array.isArray(item)
        ? item.filter((oneItem) => oneItem.category === categoryFilter)
        : item;

    if (citiesFilter === "Усі міста" && statusFilter === "Тільки актуальні") {
      return Array.isArray(item)
        ? item.filter(
            (oneItem) =>
              oneItem.category === categoryFilter && oneItem.status === false
          )
        : item;
    }

    if (
      categoryFilter === "Усі категорії" &&
      statusFilter === "Тільки актуальні"
    ) {
      return Array.isArray(item)
        ? item.filter(
            (oneItem) =>
              oneItem.city === citiesFilter && oneItem.status === false
          )
        : item;
    }

    if (statusFilter === "Тільки актуальні") {
      return Array.isArray(item)
        ? item.filter(
            (oneItem) =>
              oneItem.city === citiesFilter &&
              oneItem.status === false &&
              oneItem.category === categoryFilter
          )
        : item;
    }

    if (statusFilter === "Усі статуси") {
      return Array.isArray(item)
        ? item.filter(
            (oneItem) =>
              oneItem.city === citiesFilter &&
              oneItem.category === categoryFilter
          )
        : item;
    }
  });
