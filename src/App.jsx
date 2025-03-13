/* eslint-disable react/prop-types */
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Note from "./Components/ui/Note";
import AddNote from "./Components/notes/AddNote";
import Bin from "./Components/bin/Bin";
import {
  withAuthenticator,
  useAuthenticator,
  Authenticator,
} from "@aws-amplify/ui-react";
import AddTask from "./Components/notes/AddTask";
import CompletedTask from "./Components/completed/CompletedTask";
import InProgress from "./Components/inProgress/InProgress";
import Pending from "./Components/pending/Pending";

// eslint-disable-next-line react-refresh/only-export-components
function ProtectedRoute({ children }) {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);
  console.log(authStatus);

  if (authStatus !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  const { authStatus } = useAuthenticator((context) => [context.authStatus]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            authStatus === "authenticated" ? (
              <Navigate to="/notes" replace />
            ) : (
              <Authenticator />
            )
          }
        />

        {/* Protected Routes (User must be logged in) */}
        <Route
          element={
            <ProtectedRoute>
              <Note />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<AddNote />} />
          <Route path="/completed" element={<CompletedTask />} />
          <Route path="/inprogress" element={<InProgress />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/bin" element={<Bin />} />
        </Route>

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App);
