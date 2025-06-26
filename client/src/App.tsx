import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto border rounded shadow bg-white">
      <header className="bg-blue-600 text-white p-4 text-xl font-semibold rounded-t">
        Pixel Chat
      </header>
      <div className="flex-1 overflow-hidden">
        <ChatWindow />
      </div>
      <MessageInput />
    </div>
  );
}

export default App;
