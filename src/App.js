import "./styles.css";
import { React, useState, useRef } from "react";

export default function App() {
  const todo = [
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ];
  const [todos, setTodos] = useState(todo);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    // const updatedTodos = todos.map(t =>
    //   t.id === todo.id ? { ...t, done: !t.done } : t;
    // );

    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    console.log("clicked", updatedTodos);
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todoItem) => (
        <li
          onDoubleClick={() => handleToggleTodo(todoItem)}
          style={{ textDecoration: todoItem.done ? "line-through" : "" }}
          key={todoItem.id}
        >
          {todoItem.text}
          <DeleteTodo todo={todoItem} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = useRef();

  function handleAddTodo(event) {
    event.preventDefault();
    console.log("", event.target.elements.todoItemInput.value);
    const text = event.target.elements.todoItemInput.value;
    const todo = {
      id: Math.random(),
      text,
      done: false
    };
    setTodos((prevTodos) => {
      console.log("previous", prevTodos);
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input
        name="todoItemInput"
        placeholder="Enter Todo Item"
        ref={inputRef}
      />
      <button type="submit"> Submit</button>
    </form>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this item?");
    if (confirmed) {
      setTodos((preTodos) => {
        return preTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={() => handleDeleteTodo()}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10
      }}
    >
      X
    </span>
  );
}
