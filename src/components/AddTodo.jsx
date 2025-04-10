import { useState } from 'react'


function AddTodo({ addTodo }) {
    const [newTodo, setNewTodo] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (newTodo.trim()) {
        addTodo(newTodo)
        alert('berhasil add todo')
        setNewTodo('')
      } else {
        alert('Todo cannot be empty')
      }
    }
  
    return (
        <>
            <form onSubmit={handleSubmit} className="flex mt-5">
                <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Add Todo"
                />
                <button type='submit'
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add
                </button>
            </form>
        </>
    )
  }
  
  export default AddTodo
  