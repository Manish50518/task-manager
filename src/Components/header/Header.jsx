/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";
import "@aws-amplify/ui-react/styles.css";
import { useLocation } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

function Header({ signOut: amplifySignOut, setOpenSidebar }) {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const routeName = location.pathname;

  let headerText = "";
  if (routeName === "/notes" || routeName === "/") {
    headerText = "Dashboard";
  } else if (routeName === "/addtask") {
    headerText = "Add Tasks";
  } else if (routeName === "/completed") {
    headerText = "Completed";
  } else if (routeName === "/inprogress") {
    headerText = "In Progress";
  } else if (routeName === "/pending") {
    headerText = "Pending";
  } else if (routeName === "/bin") {
    headerText = "Bin";
  } else {
    headerText = routeName;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        setUserData({
          firstName: attributes.given_name || "N/A",
          lastName: attributes.family_name || "N/A",
          email: attributes.email || user.username,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      amplifySignOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="w-full flex items-center gap-3 px-4 py-3 shadow-sm bg-white fixed top-0 left-0 justify-between z-10">
      {/* Left section */}
      <div className="flex items-center gap-3">
        {/* Sidebar toggle button */}
        <button
          onClick={() => setOpenSidebar((prev) => !prev)}
          className="p-2 rounded-md hover:bg-gray-200 transition-all "
        >
          <HiBars3 className="text-2xl cursor-pointer" />
        </button>

        {/* Logo */}
        <img
          src="keep image.png"
          alt="Keep logo"
          className="h-9 object-contain"
        />

        {/* Page Title */}
        <p className="text-xl md:text-2xl font-medium">{headerText}</p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        <p className="text-sm md:text-base hidden sm:block">
          Hi <strong>{userData.lastName}</strong>, welcome again
        </p>
        <button
          className="bg-gray-200 p-2 rounded-md text-sm md:text-base"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;
