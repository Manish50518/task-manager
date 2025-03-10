import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Note from "./Components/ui/Note";
import AddNote from "./Components/notes/AddNote";
import Archive from "./Components/archive/Archive";
import Bin from "./Components/bin/Bin";
import { withAuthenticator } from "@aws-amplify/ui-react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Note />}>
          <Route index element={<AddNote />} />
          <Route path="/notes" element={<AddNote />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/bin" element={<Bin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withAuthenticator(App);
