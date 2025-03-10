import { useState } from "react";
import useNoteStore from "../services/store";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBulb } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNote() {
  const [addTitle, setAddTitle] = useState("");
  const [addNote, setAddNote] = useState("");
  const [openAddNote, setOpenAddNote] = useState(false);
  const { notes, addNotes, archiveNote, toBin } = useNoteStore();

  function handleAddNote(e) {
    setAddNote(e.target.value);
  }

  function handleAddTitle(e) {
    setAddTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newNote = { title: addTitle, note: addNote, id: Date.now() };

    addNotes(newNote);
    setAddNote("");
    setAddTitle("");
  }

  function handleArchive(id) {
    archiveNote(id);
    toast.success("Note archived!", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

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

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto mt-14 px-4 sm:px-6 md:px-8">
      <form
        className="w-full sm:w-[410px] p-4 shadow-lg my-3 rounded-lg mx-auto"
        onSubmit={handleSubmit}
      >
        {openAddNote && (
          <input
            type="text"
            value={addTitle}
            onChange={handleAddTitle}
            placeholder="Add a title"
            className="w-full p-3 box-border focus:ring-0 outline-none font-bold"
          />
        )}

        <input
          type="text"
          value={addNote}
          onChange={handleAddNote}
          onClick={() => setOpenAddNote(true)}
          placeholder="Take a note..."
          className="w-full p-3 box-border focus:ring-0 outline-none"
        />

        <button></button>
      </form>

      {notes.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <AiOutlineBulb className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">
            Notes that you add appear here
          </p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {notes.map((note) => (
            <div
              className="mb-2 w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4"
              key={note.id}
            >
              <p className="font-semibold mb-5">{note.title}</p>
              <p>{note.note}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleArchive(note.id)}>
                  <IoArchiveOutline />
                </button>
                <button onClick={() => handleBin(note.id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default AddNote;
