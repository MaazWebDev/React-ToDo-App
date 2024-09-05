import { useRef, useState } from 'react';
import './App.css';

function TodoApp() {
  const [todoArr, setTodoArr] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const todoTask = useRef();

  const createTodo = (event) => {
    event.preventDefault();
    
    const newTask = todoTask.current.value.trim();
    if (newTask === '') {
      alert('Please Enter A ToDo Task !');
      return;
    }
    
    setTodoArr([...todoArr, newTask]);
    todoTask.current.value = ''; 
  };

  const deleteTodoTask = (index) => {
    todoArr.splice(index, 1);
    console.log("Todo Deleted at index :", index);
    setTodoArr([...todoArr]);
  };

  const editTodoTask = (index) => {
    const editedTodo = prompt("Enter Edited Todo Value", todoArr[index]);
    if (editedTodo && editedTodo.trim() !== '') {
      todoArr.splice(index, 1, editedTodo.trim());
      setTodoArr([...todoArr]);
    }
  };

  return (
    <>
      <h1>Todo Application</h1>
      <form onSubmit={createTodo} id="todo-input-form">
        <input type="text" placeholder="Enter task" ref={todoTask} />
        <button type="submit">Set Task</button>
      </form>
      {errorMsg && <p className="error-message">{errorMsg}</p>}
      <div id="todo-list-dom">
        {todoArr.length > 0 ? (
          todoArr.map((task, index) => {
            return (
              <div key={index} className="todo-list-task">
                <p>{task}</p>
                <div id="button-cont">
                  <button
                    className="task-button"
                    onClick={() => {
                      deleteTodoTask(index);
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button
                    className="task-button"
                    onClick={() => {
                      editTodoTask(index);
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p id="elsed-para">No Task Found!</p>
        )}
      </div>
    </>
  );
}

export default TodoApp;
