import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Pnf from "./pages/Pnf";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Pnf />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
