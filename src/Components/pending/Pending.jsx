import useNoteStore from "../services/store";
import { MdOutlinePendingActions } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";
import { FaRegClock } from "react-icons/fa";

function Pending() {
  const { pending, progressTask } = useNoteStore();
  function handleClick(id) {
    progressTask(id);
  }
  return (
    <div className="w-full max-w-screen-xl mx-auto mt-14 px-4 sm:px-6 md:px-8">
      {pending.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <MdOutlinePendingActions className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">No Pending Tasks</p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {pending.map((item, id) => (
            <div
              key={id}
              className="w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4 flex flex-col h-full"
            >
              <div className="flex justify-between">
                <p
                  className={`${
                    item.priority === "P1" ? "text-red-600 " : "text-blue-700"
                  } font-bold`}
                >
                  {item.priority}
                </p>
                <p className="text-yellow-600 font-semibold mb-5">
                  {item.status}
                </p>
              </div>
              <p className="font-semibold mb-5 break-words whitespace-normal">
                {item.title}
              </p>
              <div className="flex-1">
                {" "}
                <p className="whitespace-pre-line break-words">{item.note}</p>
              </div>

              <div className="flex justify-between gap-2 mt-4  pt-2 border-t">
                <div className="flex items-center gap-2 text-red-600 font-semibold">
                  {" "}
                  <FaRegClock />
                  <p className="text-red-600 ">
                    {new Date(item.endingDate).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <button onClick={() => handleClick(item.id)}>
                  <GrInProgress />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pending;
