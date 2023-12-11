import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllStudent from "./components/AllStudent";
import EditStudent from "./components/EditStudent";
import CreateStudent from "./components/CreateStudent";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<AllStudent />} />
          <Route path="/create" element={<CreateStudent />} />
          <Route exact path="/student/:id" element={<EditStudent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
