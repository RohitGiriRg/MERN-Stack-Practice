import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/todos")
      .then((response) => setTodo(response.data))
      .catch((error) => console.log("Error fetching data :", error));
  }, []);

  return (
    <div className="App">
      <div>
        {todo.map((todo) => {
          return (
            <div>
              <h4>{todo._id}</h4>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
