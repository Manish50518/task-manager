/* eslint-disable react/prop-types */
import { useState } from "react";
import Sidebar from "../siderbar/Sidebar";
import Header from "../header/Header";

function Layout() {
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <div className="flex flex-col">
      <Header setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} />
    </div>
  );
}

export default Layout;
