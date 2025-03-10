/* eslint-disable react/prop-types */
import { AiOutlineBulb } from "react-icons/ai";
import { IoArchiveOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar({ openSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`h-screen mt-12 flex flex-col items-center transition-all duration-300 ${
        openSidebar ? "w-[300px]" : "w-[70px]"
      }`}
    >
      <button
        onClick={() => navigate("/notes")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all mt-4  
        ${
          activePath === "/notes" || activePath === "/" ? "bg-orange-100" : ""
        }`}
      >
        <AiOutlineBulb className="text-xl" />
        {openSidebar && <span className="font-semibold">Notes</span>}
      </button>

      <button
        onClick={() => navigate("/archive")}
        className={`w-full flex items-center gap-8 py-4 rounded-r-full p-3 hover:bg-gray-200 transition-all  
        ${activePath === "/archive" ? "bg-orange-100" : ""}`}
      >
        <IoArchiveOutline className="text-xl" />
        {openSidebar && <span className="font-semibold">Archive</span>}
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
