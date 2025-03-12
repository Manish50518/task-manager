import { useState } from "react";
import useNoteStore from "../services/store";

function AddTask() {
  const [addTitle, setAddTitle] = useState("");
  const [addNote, setAddNote] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("P0");
  const { addNotes } = useNoteStore();

  function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      title: addTitle,
      note: addNote,
      id: Date.now(),
      endingDate: endDate,
      status: status,
      priority: priority,
    };
    addNotes(newNote);
    setAddNote("");
    setAddTitle("");
    setEndDate("");
    setPriority("P0");
    setStatus("Pending");
  }

  return (
    <form
      className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-full p-4 shadow-lg mt-[70px] rounded-lg mx-auto flex flex-col"
      onSubmit={handleSubmit}
    >
      <div className="p-4">
        <label className="p-2 block text-gray-700 text-xs font-bold">
          Add Task Title
        </label>
        <input
          type="text"
          value={addTitle}
          required
          onChange={(e) => setAddTitle(e.target.value)}
          placeholder="Add a title"
          className="w-full bg-gray-200 mb-3 rounded-md p-3 box-border focus:ring-0 outline-none font-bold"
        />

        <label className="p-2 block text-gray-700 text-xs font-bold">
          Add Task
        </label>
        <textarea
          type="text"
          value={addNote}
          onChange={(e) => setAddNote(e.target.value)}
          required
          rows="3"
          cols="50"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent default Enter behavior
              setAddNote((prev) => prev + "\n• "); // Append bullet point only when Enter is pressed
            }
          }}
          placeholder="Add task..."
          className="w-full p-3 bg-gray-200 rounded-md box-border focus:ring-0 outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-4 p-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-gray-700 text-xs font-bold mb-2">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-gray-700 text-xs font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            required
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
        {/* Status Dropdown */}
        <div className="w-full sm:w-1/2 flex flex-col">
          <label htmlFor="status" className="font-bold">
            Status
          </label>
          <select
            value={status}
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            className="w-full sm:w-[200px] bg-gray-200 p-3 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority Dropdown */}
        <div className="w-full sm:w-1/2 flex flex-col">
          <label htmlFor="priority" className="font-bold">
            Priority
          </label>
          <select
            value={priority}
            name="priority"
            id="priority"
            onChange={(e) => setPriority(e.target.value)}
            className="w-full sm:w-[200px] bg-gray-200 p-3 rounded-md"
          >
            <option value="P0">P0</option>
            <option value="P1">P1</option>
            <option value="P2">P2</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-auto">
        <button className="bg-yellow-200 px-6 py-3 rounded-md">Add</button>
      </div>
    </form>
  );
}

export default AddTask;
