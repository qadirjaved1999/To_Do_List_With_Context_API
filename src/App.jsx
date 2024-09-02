import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./Contexts";
import { TodosForm, TodosItems } from "./Components";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todoTitle) =>{
   setTodos((oldArray) => [{id: Date.now(), ...todoTitle},...oldArray])
  } 
  const updateTodo = (id, todoTitle) =>{
    console.log(id + "<=>" + todoTitle);
    setTodos((previousValue) => previousValue.map((preTodo)=> (preTodo.id === id ? todoTitle : preTodo)))
   } 
   const deleteTodo = (id) =>{
    console.log(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
   } 
   const toggleCompleteTodo = (id) =>{
    console.log(id);
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, checked: !prevTodo.checked} : prevTodo))
   } 
   
   useEffect(() => {
    //Because local storage return the string value and required in JSON so I want to convert in json.
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.lenght > 0) {
      setTodos(todos);
    }
   }, []);

   useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
   }, [todos])
   

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodosForm /> </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div className="w-full" key={todo.id}>
               <TodosItems todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
