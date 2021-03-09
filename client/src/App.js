import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  useEffect(() => {
    const socket = io("http://localhost:3100");

    return () => socket.disconnect();
  }, [])
  const [message, setMessage] = useState("");

  function sendMessage() {
    // socket.emit("message", message)
  }

  function onMessageChange(val) {
    setMessage(val);
  }

  return (
    <div >
      <header>
        <p>
          helepati helepati helepati
        </p>

        <input onChange={(e) => onMessageChange(e.target.value)}></input>
        <button onClick={sendMessage}>yolla</button>
      </header>
    </div>
  );
}

export default App;
