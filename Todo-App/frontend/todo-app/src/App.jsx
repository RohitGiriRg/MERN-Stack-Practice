import { useEffect, useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [isNewTodoCreated, setIsNewTodoCreated] = useState(true);

  const fetchingData = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    setTodos(data.gettingTodo);
    console.log("sasdf");
  };

  useEffect(() => {
    if (isNewTodoCreated) {
      fetchingData();
      setIsNewTodoCreated(false); // Reset the state after fetching
    }
  }, [isNewTodoCreated]);

  return (
    <div>
      <CreateTodo
        childProp={isNewTodoCreated}
        setIsNewTodoCreated={setIsNewTodoCreated}
      />
      <Todos todos={todos} />
    </div>
  );
}

export default App;
