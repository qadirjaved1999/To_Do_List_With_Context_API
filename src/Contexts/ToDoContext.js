import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
           id:1,
           todoTitle: "Todo Message",
           checked: false
        }
    ],
    addTodo: (todoTitle) => {},
    updateTodo: (id, todoTitle) => {},
    deleteTodo: (id) => {},
    toggleCompleteTodo: (id) => {}
});


export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider;