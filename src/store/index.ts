import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ToDo = {
  id: number;
  title: string;
  done: boolean;
};

let newId = 0;

const todosSlice = createSlice({
  name: "todos",
  initialState: [] as ToDo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      newId = newId + 1;
      return [...state, { id: newId, title: action.payload, done: false }];
    },
    removeTodo: (state, action: PayloadAction<ToDo["id"]>) =>
      state.filter((t) => t.id !== action.payload),
    completeTodo: (state, action: PayloadAction<ToDo["id"]>) =>
      state.map((t) => (t.id === action.payload ? { ...t, done: !t.done } : t)),
  },
});

export const { reducer, actions } = todosSlice;
