import { RiInboxUnarchiveFill } from "react-icons/ri";
import useNoteStore from "../services/store";
import { IoArchiveOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Archive() {
  const { archive, unarchiveNote } = useNoteStore();

  function handleClick(id) {
    unarchiveNote(id);
    toast.success("Note unarchived!", {
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
      {archive.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <IoArchiveOutline className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">
            Your archived notes appear here
          </p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {archive.map((note) => (
            <div
              className="w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4"
              key={note.id}
            >
              <p className="font-semibold mb-5 break-words whitespace-normal">
                {note.title}
              </p>
              <p className="break-words whitespace-normal">{note.note}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleClick(note.id)}>
                  <RiInboxUnarchiveFill />
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

export default Archive;
