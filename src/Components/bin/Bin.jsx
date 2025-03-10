import { FaTrashRestore } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import useNoteStore from "../services/store";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function Bin() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const { bin, deleteNote, restoreNote } = useNoteStore();

  function handleRestore(id) {
    restoreNote(id);
    toast.success("Note restored!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function handleDeleteClick(id) {
    setSelectedNoteId(id);
    setOpenModel(true);
  }

  function confirmDelete() {
    deleteNote(selectedNoteId);
    setOpenModel(false);
    toast.error("Note deleted permanently!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-14 px-4 sm:px-6 md:px-8">
      {bin.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <RiDeleteBin6Line className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">No notes in Recycle Bin</p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {bin.map((note) => (
            <div
              className="w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4"
              key={note.id}
            >
              <p className="font-semibold mb-5 break-words whitespace-normal">
                {note.title}
              </p>
              <p className="break-words whitespace-normal">{note.note}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleRestore(note.id)}>
                  <FaTrashRestore className="text-sm" />
                </button>
                <button onClick={() => handleDeleteClick(note.id)}>
                  <MdDeleteForever className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {openModel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%] sm:w-[500px] p-6 rounded-lg shadow-lg">
            <p className="text-md">Delete note forever?</p>
            <div className="flex justify-end mt-4 gap-4">
              <button
                onClick={() => setOpenModel(false)}
                className="px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-blue-500 rounded-md hover:bg-green-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Bin;
