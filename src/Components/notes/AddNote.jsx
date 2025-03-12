import useNoteStore from "../services/store";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdTaskAlt } from "react-icons/md";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
function AddNote() {
  const { notes, toBin, updateNote } = useNoteStore();
  const [editTask, setEditTask] = useState({
    id: "",
    title: "",
    note: "",
    status: "",
    priority: "",
  });

  function handleBin(id) {
    toBin(id);
    toast.error("Note moved to bin!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  function handleUpdate() {
    if (!editTask.id) return;
    updateNote(editTask.id, {
      title: editTask.title,
      note: editTask.note,
      status: editTask.status,
      priority: editTask.priority,
    });
    setEditTask({ id: "", title: "", note: "", status: "" });
    toast.success("Task updated successfully!", {
      position: "bottom-left",
      autoClose: 3000,
    });
  }

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto mt-14 px-4 sm:px-6 md:px-8">
      {notes.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <MdTaskAlt className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">
            Task that you add appear here
          </p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {notes.map((note) => (
            <div
              className="mb-2 w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4 flex flex-col h-full"
              key={note.id}
            >
              <div className="flex justify-between">
                <p
                  className={`${
                    note.priority === "P1" ? "text-red-600" : "text-blue-700"
                  } font-bold`}
                >
                  {note.priority}
                </p>
                <p
                  className={`${
                    note.status === "Completed"
                      ? "text-green-800"
                      : note.status === "Pending"
                      ? "text-yellow-500"
                      : "text-red-600"
                  } font-bold`}
                >
                  {note.status}
                </p>
              </div>

              <p className="font-semibold">{note.title}</p>

              <div className="flex-1">
                <p className="whitespace-pre-line break-words">{note.note}</p>
              </div>

              <div className="flex justify-between mt-4 pt-2 border-t">
                <button onClick={() => handleBin(note.id)}>
                  <RiDeleteBin6Line />
                </button>
                <button
                  onClick={() =>
                    setEditTask({
                      id: note.id,
                      title: note.title,
                      note: note.note,
                      status: note.status,
                      priority: note.priority,
                    })
                  }
                >
                  <FaRegEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editTask.id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Update title"
            />
            <textarea
              value={editTask.note}
              onChange={(e) =>
                setEditTask({ ...editTask, note: e.target.value })
              }
              className="border p-2 w-full mb-2"
              placeholder="Update note"
            />
            <div className="flex gap-2">
              <div className="flex flex-col ">
                {" "}
                <label htmlFor="status" className="p-2 font-bold">
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  value={editTask.status}
                  className="p-1 w-[150px] bg-gray-100"
                  onChange={(e) =>
                    setEditTask({ ...editTask, status: e.target.value })
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col ">
                {" "}
                <label htmlFor="priority" className="p-2 font-bold">
                  Priority
                </label>
                <select
                  name="priority"
                  id="priority"
                  value={editTask.priority}
                  className="p-1 w-[150px] bg-gray-100"
                  onChange={(e) =>
                    setEditTask({ ...editTask, priority: e.target.value })
                  }
                >
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddNote;
