/* eslint-disable react/prop-types */

import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  MdAddTask,
  MdOutlinePendingActions,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { GrInProgress } from "react-icons/gr";

function Sidebar({ openSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`h-full mt-[65px]   flex flex-col items-center transition-all duration-300   ${
        openSidebar ? "w-[300px]" : "w-[70px]"
      }`}
    >
      <button
        onClick={() => navigate("/notes")}
        className={`w-full  flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all   
        ${
          activePath === "/notes" || activePath === "/" ? "bg-orange-100" : ""
        }`}
      >
        <MdOutlineSpaceDashboard className="text-xl" />
        {openSidebar && <span className="font-semibold">Dashboard</span>}
      </button>

      <button
        onClick={() => navigate("/addtask")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/addtask" ? "bg-orange-100" : ""}`}
      >
        <MdAddTask className="text-xl" />
        {openSidebar && <span className="font-semibold">Add Tasks</span>}
      </button>
      <button
        onClick={() => navigate("/completed")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/completed" ? "bg-orange-100" : ""}`}
      >
        <IoCheckmarkDoneCircleOutline className="text-2xl" />
        {openSidebar && <span className="font-semibold">Completed</span>}
      </button>
      <button
        onClick={() => navigate("/inprogress")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/inprogress" ? "bg-orange-100" : ""}`}
      >
        <GrInProgress className="text-xl" />
        {openSidebar && <span className="font-semibold">In Progress</span>}
      </button>
      <button
        onClick={() => navigate("/pending")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/pending" ? "bg-orange-100" : ""}`}
      >
        <MdOutlinePendingActions className="text-xl" />
        {openSidebar && <span className="font-semibold">Pending</span>}
      </button>

      <button
        onClick={() => navigate("/bin")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/bin" ? "bg-orange-100" : ""}`}
      >
        <RiDeleteBin6Line className="text-xl" />
        {openSidebar && <span className="font-semibold">Bin</span>}
      </button>
    </div>
  );
}

export default Sidebar;
