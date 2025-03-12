import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Note from "./Components/ui/Note";
import AddNote from "./Components/notes/AddNote";
import Bin from "./Components/bin/Bin";
import { withAuthenticator } from "@aws-amplify/ui-react";
import AddTask from "./Components/notes/AddTask";
import CompletedTask from "./Components/completed/CompletedTask";
import InProgress from "./Components/inProgress/InProgress";
import Pending from "./Components/pending/Pending";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Note />}>
          <Route index element={<AddNote />} />
          <Route path="/notes" element={<AddNote />} />

          <Route path="/completed" element={<CompletedTask />} />
          <Route path="/inprogress" element={<InProgress />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/bin" element={<Bin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App);
