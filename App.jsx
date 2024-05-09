import React, { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import {TodoList} from './TodoList'

export default function App() {
  //getting the value from local storage, if it exists
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) return []

    return JSON.parse(localValue)
  });

  //every time todos change, call function that stores items in local storage
  useEffect(() =>{
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])
  
  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false
      }
    ])
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    )
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">"To do" List: </h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </>
  )
}
