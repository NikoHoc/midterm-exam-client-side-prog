import { useReducer, useEffect, useState } from 'react';
import './App.css'
import Navbar from './layout/Navbar'
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';

const initialTodoState = {
  filter: 'semua',
};

function reducer(todoState, action) {
  switch (action.type) {
    case 'semua':
      return { filter: 'semua' };
    case 'selesai':
      return { filter: 'selesai' };
    case 'aktif':
      return { filter: 'aktif' };
    default:
      return todoState;
  }
}

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [todoState, dispatch] = useReducer(reducer, initialTodoState);

  // mengisi filteredTodos dengan todo, sesuai dengan todoState yang diset dari reducer
  const filteredTodos = todos.filter((todo) => {
    if (todoState.filter === 'semua') return true;
    if (todoState.filter === 'selesai') return todo.completed;
    if (todoState.filter === 'aktif') return !todo.completed;
    return true;
  });

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editingText.trim()) {
      alert('Todo tidak boleh kosong')
      return
    };
  
    const updatedTodos = todos.map((todo) =>
      todo.id === editingId ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
  
    // Tutup modal
    setEditingId(null);
    setEditingText("");
    document.getElementById("edit-modal").classList.add("hidden");
  };
  
  return (
    <>
      <Navbar/>
      <div className='text-center container mx-auto'>
        <h1 className='text-2xl font-bold mt-5'>Todo List</h1>
        <AddTodo addTodo={addTodo} />

        {/* Menggunakan reducer untuk mengset state dari todo yang ingin ditampilkan */}
        <div className="inline-flex rounded-md shadow-xs mt-5" role="group">
          <button onClick={() => dispatch({ type: 'semua' })} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Semua
          </button>
          <button onClick={() => dispatch({ type: 'selesai' })} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Selesai
          </button>
          <button onClick={() => dispatch({ type: 'aktif' })} type="button" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
            Aktif
          </button>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 italic">
          Showing: {todoState.filter}
        </p>

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          setEditingId={setEditingId}
          setEditingText={setEditingText}
        />

        <EditModal
          editingText={editingText}
          setEditingText={setEditingText}
          setEditingId={setEditingId}
          handleEditSubmit={handleEditSubmit}
        />
      </div>
    </>
  )
}

export default App
