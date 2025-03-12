import { RiInboxUnarchiveFill } from "react-icons/ri";
import useNoteStore from "../services/store";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

function CompletedTask() {
  const { completed } = useNoteStore();
  return (
    <div className="w-full max-w-screen-xl mx-auto mt-14 px-4 sm:px-6 md:px-8">
      {completed.length === 0 ? (
        <div className="flex flex-col items-center mt-[250px]">
          <IoCheckmarkDoneCircleOutline className="text-8xl text-gray-400" />
          <p className="text-2xl mt-2 text-gray-400">No Tasks to Complete</p>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {completed.map((item, id) => (
            <div
              key={id}
              className="w-full max-w-[220px] mx-auto rounded-md border overflow-hidden p-4"
            >
              <div className="flex justify-between">
                <p
                  className={`${
                    item.priority === "P1" ? "text-red-600 " : "text-blue-700"
                  } font-bold`}
                >
                  {item.priority}
                </p>
                <p className="text-green-800 font-semibold mb-5">
                  {item.status}
                </p>
              </div>
              <p className="font-semibold mb-5 break-words whitespace-normal">
                {item.title}
              </p>
              <p className="whitespace-pre-line break-words">{item.note}</p>
              {/* <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => handleClick(item.id)}>
                  <RiInboxUnarchiveFill />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CompletedTask;
