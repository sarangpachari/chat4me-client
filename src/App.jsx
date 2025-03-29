import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Pnf from "./pages/Pnf";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Account from "./pages/Account";
import CreateGroup from "./pages/CreateGroup";
import GroupInfo from "./pages/GroupInfo";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Pnf />} />
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/group" element={<CreateGroup />} />
          <Route path="/group-info/:groupId" element={<GroupInfo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
