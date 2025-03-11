/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getCurrentUser, fetchUserAttributes, signOut } from "aws-amplify/auth";
// import { withAuthenticator } from "@aws-amplify/ui-react";
// import awsExports from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import { useLocation } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

// Amplify.configure(awsExports);

// eslint-disable-next-line react-refresh/only-export-components
function Header({ signOut: amplifySignOut, setOpenSidebar }) {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const routeName = location.pathname;

  let headerText = "";

  if (routeName === "/notes" || routeName === "/") {
    headerText = "Keep";
  } else if (routeName === "/archive") {
    headerText = "Archive";
  } else if (routeName === "/bin") {
    headerText = "Bin";
  } else {
    headerText = routeName;
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes(); // Fetch user attributes

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
      amplifySignOut(); // Ensure proper sign-out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="w-full flex items-center gap-3 p-3 shadow-sm bg-white fixed top-0 left-0 justify-between">
      <div className="flex gap-3">
        <button onClick={() => setOpenSidebar((prev) => !prev)}>
          <HiBars3 className="text-2xl cursor-pointer hover:opacity-80 transition-all" />
        </button>
        <img
          src="keep image.png"
          alt="Keep logo"
          className="h-9 object-contain"
        />

        <p className="text-3xl">{headerText}</p>
      </div>
      <div className="flex gap-4">
        <p>Hi {userData.firstName} Wellcome again </p>
        <button className="bg-gray-200 p-2 rounded-md" onClick={handleSignOut}>
          Sign Out maka
        </button>
      </div>
    </header>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default Header;
