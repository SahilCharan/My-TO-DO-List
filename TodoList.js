import React, { useState, useEffect, useRef } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto focus on input
  }, []);

  const addTask = () => {
    if (newTask.trim() === '') return;
    setTasks(prev => [...prev, { text: newTask, completed: false }]);
    setNewTask('');
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Pending') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-2xl rounded-xl">
      <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">🚀 To-Do Dashboard</h1>

      {/* Task Input */}
      <div className="flex gap-3 mb-6">
        <input
          ref={inputRef}
          type="text"
          className="border border-gray-300 p-3 flex-grow rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="What's on your mind?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-4">
        {['All', 'Completed', 'Pending'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full font-medium border transition ${
              filter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="text-center text-sm text-gray-600 mb-4">
        <p>Total: {tasks.length} | ✅ Completed: {completedCount} | ⏳ Pending: {pendingCount}</p>
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 text-center italic">No tasks to show...</p>
        ) : (
          filteredTasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="accent-blue-600 w-4 h-4"
                />
                <span className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                🗑️
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
