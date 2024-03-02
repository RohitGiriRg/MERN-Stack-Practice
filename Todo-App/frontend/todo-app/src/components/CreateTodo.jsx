import { useState } from "react";

export function CreateTodo({ childProp, setIsNewTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postData = {
    title: title,
    description: description,
  };

  return (
    <div>
      <input
        type="text"
        placeholder="title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          setIsNewTodoCreated(false);
          fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Content-Length": JSON.stringify(postData).length.toString(),
            },
            body: JSON.stringify(postData),
          })
            .then(async (res) => {
              const json = await res.json();
              alert("Todo added");
            })
            .finally(() => {
              setIsNewTodoCreated(true);
            });
        }}
      >
        Add a todo
      </button>
    </div>
  );
}
