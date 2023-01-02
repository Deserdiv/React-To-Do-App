import React, { useState } from "react";
import './App.css'
function TodoApp() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false,
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false,
    },
    {
      text: "Build really cool todo app",
      isCompleted: false,
    },
  ]);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState("all");

  function handleTodoClick(index) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  function handleDeleteClick(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function handleNewTodoSubmit(event) {
    event.preventDefault();
    if (!newTodoText) return;
    setTodos([
      ...todos,
      {
        text: newTodoText,
        isCompleted: false,
      },
    ]);
    setNewTodoText("");
  }

  function handleNewTodoChange(event) {
    setNewTodoText(event.target.value);
  }

  function getFilteredTodos() {
    if (filter === "all") return todos;
    if (filter === "completed") return todos.filter((todo) => todo.isCompleted);
    if (filter === "uncompleted")
      return todos.filter((todo) => !todo.isCompleted);
  }

  return (
    <div className="app">
      <form onSubmit={handleNewTodoSubmit}>
        <input
          type="text"
          value={newTodoText}
          onChange={handleNewTodoChange}
          placeholder="Add new todo"
        />
        <button type="submit">Add</button>
      </form>
      <div className="todo-list">
        {getFilteredTodos().map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            handleTodoClick={handleTodoClick}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      <div className="filter-options">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === "all"}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="completed"
            checked={filter === "completed"}
            onChange={handleFilterChange}
          />
          Completed
        </label>
        <label>
          <input
            type="radio"
            value="uncompleted"
            checked={filter === "uncompleted"}
            onChange={handleFilterChange}
          />
          Uncompleted
        </label>
      </div>
    </div>
  );
}

function Todo({ todo, index, handleTodoClick, handleDeleteClick }) {
  return (
    <div className="todo">
      <div
        className="todo-text"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        onClick={() => handleTodoClick(index)}
      >
        {todo.text}
      </div>
      <button
        className="delete-button"
        onClick={() => handleDeleteClick(index)}
      >
        X
      </button>
    </div>
  );
}

export default TodoApp;
