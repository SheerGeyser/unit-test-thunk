import React from "react";
import { reducer as todoReducer, actions as todoActions } from "../store/index";

describe("ToDo slice", () => {
  test("inital state", () => {
    const initalState = undefined;
    const action = { type: undefined };

    expect(todoReducer(initalState, action)).toEqual([]);
  });

  test("shoud add new todo to state", () => {
    const initalState = undefined;
    const action = todoActions.addTodo("Say Hello");

    expect(todoReducer(initalState, action)).toEqual([
      { id: 1, title: "Say Hello", done: false },
    ]);
  });

  test("should delete todo by id", () => {
    expect(
      todoReducer(
        [{ id: 1, title: "Delete me", done: false }],
        todoActions.removeTodo(1)
      )
    ).toEqual([]);
  });

  test("shoud complete todo", () => {
    expect(
      todoReducer(
        [{ id: 1, title: "Done", done: false }],
        todoActions.completeTodo(1)
      )
    ).toEqual([{ id: 1, title: "Done", done: true }]);
  });
});
