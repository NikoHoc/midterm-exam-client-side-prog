import { useState } from 'react'
import './App.css'
import Navbar from './layout/Navbar'
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import EditModal from './components/EditModal';



function App() {
  const [todos, setTodos] = useState([])

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
        
        <TodoList
          todos={todos}
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
