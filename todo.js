import React, { useState, useEffect } from 'react';
import './App.css';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filterCompleted, setFilterCompleted] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      // Fetch initial todos from the API
      fetch('https://jsonplaceholder.typicode.com/users/1/todos')
        .then(response => response.json())
        .then(data => setTodos(data));
    }, []);
  
    const addTask = () => {
      if (newTask.trim() !== '') {
        const newTodo = {
          userId: 1,
          id: todos.length + 1,
          title: newTask,
          completed: false,
        };
  
        setTodos([...todos, newTodo]);
        setNewTask('');
        setError('');
      } else {
        setError('Task name cannot be empty');
      }
    };
  
    const toggleComplete = (id) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };
  
    const editTask = (id, newTitle) => {
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
    };
  
    const deleteTask = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const filteredTodos = filterCompleted ? todos.filter((todo) => todo.completed) : todos;
  
    return (
      <div className="App">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="App">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={`flex-grow border rounded py-2 px-4 mr-2 border-black border-[3px] focus:outline-none ${error ? 'border-red-500' : ''}`}
          />
          <button onClick={addTask} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Task
          </button>
        </div>
        {error ? <p className="text-red-500 mb-2">{error}</p> : null}
        <div className="App">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filterCompleted}
              onChange={() => setFilterCompleted(!filterCompleted)}
              className="mr-2"
            />
            Show Completed
          </label>
        </div>
        <table className="w-full border-[2px] border-[gray]">
          <thead>
            <tr>
              <th className="border px-4 py-2">Task</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo,index) => (
              <tr key={todo.id} className={`${!todo.completed ? 'bg-gray-500' : ''}`}>
                <td className={`border px-4 py-2 ${todo.completed ? 'line-through text-black-500' : ''}`}>
                  {todo.completed ? `${todo.title} (Completed)` : todo.title}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => toggleComplete(todo.id)}
                    className={`${
                      todo.completed ? 'bg-green-500' : 'bg-red-500'
                    } text-white py-1 px-2 rounded mr-2`}
                  >
                    {todo.completed ? 'Completed' : 'Complete it'}
                  </button>
                  <button
                    onClick={() => editTask(todo.id, prompt('Enter new task name', todo.title))}
                    className="bg-yellow-500 text-white py-1 px-2 rounded mr-2 mt-[15px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(todo.id)}
                    className="mt-[15px] bg-purple-500 text-white py-1 px-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TodoApp;