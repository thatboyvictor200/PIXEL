import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Welcome from "./pages/Welcome";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
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
