import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Register from "./pages/Register";
import Number from "./pages/Number";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Welcome from "./pages/Welcome";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";
import 'react-phone-input-2/lib/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/number" element={<Number />} />
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Added Register route */}
        <Route path="/verify" element={<Verify />} /> {/* Added Verify route */}
        <Route path="/terms" element={<Terms />} /> {/* Added Terms route */}
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
