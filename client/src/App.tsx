import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Welcome from "./pages/Welcome";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="/chat"
          element={
            <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded shadow">
              <ChatWindow />
              <MessageInput />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
