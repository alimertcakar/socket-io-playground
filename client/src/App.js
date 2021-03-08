import { useState } from "react";
import { io } from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");

  function sendMessage() {
    console.log(message);
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
