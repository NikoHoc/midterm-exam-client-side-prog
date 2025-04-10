import React from 'react';

function EditModal({ editingText, setEditingText, setEditingId, handleEditSubmit }) {
  const closeModal = () => {
    setEditingId(null);
    document.getElementById("edit-modal").classList.add("hidden");
  };

  return (
    <div
      id="edit-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="hidden fixed z-50 top-0 left-0 right-0 w-full h-full flex justify-center items-center bg-opacity-50"
    >
      <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Todo</h3>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleEditSubmit}>
          <input
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Edit Todo"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2.5 rounded-lg"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;