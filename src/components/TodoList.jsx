import React from 'react';

function TodoList({ todos, toggleTodo, deleteTodo, setEditingId, setEditingText }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Todo</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Edit</th>
            <th className="px-6 py-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                There is no todo at the moment.
              </td>
            </tr>
          ) : (
            todos.map((todo) => (
              <tr
                key={todo.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* Mengecek todo, completed atau not completed untuk efek dicoret jika completed */}
                <th className={`px-6 py-4 font-medium whitespace-nowrap ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                  {todo.text}
                </th>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditingText(todo.text);
                      document.getElementById("edit-modal").classList.remove("hidden");
                    }}
                    type="button"
                    className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;