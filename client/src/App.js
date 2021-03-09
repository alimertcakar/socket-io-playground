import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import styled from 'styled-components'

const socket = io("http://localhost:3100");

function App() {
  const anchor = useRef(null);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([{ message: "", self: false }]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);

  function handleIncomingMessage(message) {
    setAllMessages(prevAllMessages => [...prevAllMessages, { message: message, self: false }]);
  }

  function handleOtherUserTyping(isTyping) {
    setIsOtherUserTyping(isTyping)
  }



  useEffect(() => {
    anchor.current.scrollIntoView();

  }, [allMessages])

  useEffect(() => {
    if ((message != "")) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [message])


  useEffect(() => {
    if (isTyping) {
      socket.emit("IS_TYPING", true);
    } else {
      socket.emit("IS_TYPING", false);
    }
  }, [isTyping])





  useEffect(() => {
    socket.on("message", handleIncomingMessage);
    socket.on("IS_TYPING", handleOtherUserTyping);

    return () => { socket.disconnect(); };
  }, [])


  function sendMessage() {
    setAllMessages(prevAllMessages => [...prevAllMessages, { message: message, self: true }]);
    socket.emit("message", message);
    setMessage("");
  }

  function onMessageChange(val) {
    setMessage(val);
  }


  return (
    <OuterContainer>
      <div >
        <MessageContainer>
          {allMessages.filter(message => message.message).map(message => (<Message isSelfSend={message.self}>{message.message}</Message>))}

          <Anchor ref={anchor}></Anchor>
        </MessageContainer>
        <InputStyled
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}></InputStyled>
        <ButtonStyled onClick={sendMessage}>yolla</ButtonStyled>
      </div>
      {isOtherUserTyping && "Diğer kullanıcı yazıyor..."}
    </OuterContainer>
  );
}

const InputStyled = styled.input`
width:362px;
padding:15px 0;
border:2px solid #efefef;
`

const ButtonStyled = styled.button`
padding:17px 10px;
color:gray;
border:none;
`
const Anchor = styled.div`
content:"";
height:2px;
width:2px;
`


const OuterContainer = styled.div`
margin-left:calc(50vw - 200px);
margin-top:25px;
`

const MessageContainer = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
max-width:400px;
border:1px solid gray;
padding:5px;
height:400px;
overflow-y:scroll;
`

const Message = styled.div`
color:#fff;
margin-top:10px;
border-radius:4px;
display:inline-flex;
padding:5px;
${({ isSelfSend }) => `
${isSelfSend ? `background-color:#084643;
align-self:flex-end;

` : `
background-color:#232B36;
`}
`
  }

`

export default App;
