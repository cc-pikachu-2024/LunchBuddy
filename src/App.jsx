import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Login from "./pages/login";
import Signup from "./pages/signup";
import RequestList from "./pages/requestList";
import RequestDetail from "./pages/requestDetail";
import RequestSend from "./pages/requestSend";
import PurchasingDetail from "./pages/purchasingDeetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/requestList" element={<RequestList />} />
        <Route path="/requestDetail" element={<RequestDetail />} />
        <Route path="/requestSend" element={<RequestSend />} />
        <Route path="/purchasingDetail" element={<PurchasingDetail />} />
      </Routes>
    </>
  );
}

export default App;
