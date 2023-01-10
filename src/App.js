import "./App.css";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";

export default function App() {
  const id = uuidv1();
  const [todo, setTodo] = useState({
    id: "",
    description: "",
    is_done: false
  });

  const [todos, setTodos] = useState([]);

  const handleTodoOnChange = (e) => {
    setTodo((prevState) => ({
      ...prevState,
      id: id,
      description: e.target.value
    }));
  };

  const handleTodoSubmit = () => {
    setTodos([...todos, todo]);
    setTodo((prevState) => ({ ...prevState, description: "" }));
  };

  

  const removeTodo = (e) => {
    setTodos([...todos].filter((s) => s.id !== e.id));
  };
  
  const markAsDone = (e) => {
    setTodos(
      [...todos].map((s) => {
        if (s.id === e.id) {
          s.isDone = !s.isDone;
        }
        return s;
      })
    );
  };

  
 
  let tableHeaders = Object.keys(todo);
  tableHeaders.push("remove");

  return (
    <div className="App">
      <form onSubmit={(e) => e.preventDefault()}>
        <h1> Todo App js </h1>
        <input value={todo.description} onChange={handleTodoOnChange} />
        <button onClick={handleTodoSubmit}> add Todo </button>
      </form>
      <table>
        <thead>
        <tr>
            {tableHeaders.map((e, i) => (
              <th key={i}> {e} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {todos.map((e, i) => (
            <tr>
              <td> {e.id.split("-")[0]} </td>
              <td> {e.description} </td>
              <td onClick={() => markAsDone(e)}>{e.isDone ? "done" : "not done"}</td>
              <td onClick={() => removeTodo(e)}> x </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
