import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
    const {targetID} = useParams()
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("")
    const user = useSelector(store => store.user)
    const userID = user?._id


    const fetchChat = async() => {
     
      const chat = await axios.get(BASE_URL + "/chat/" + targetID, {
        withCredentials: true,
      });
  
      console.log(chat.data.messages);

      const chatMessage = chat?.data?.messages.map(msg => {
        return {firstName:msg?.senderID?.firstName, lastName:msg?.senderID?.lastName, text: msg.text}
      })
         setMessage(chatMessage) 
      }
    

    useEffect(() => {
        fetchChat()
    }, [])


    useEffect(() => {
        if(!userID) return;
        const socket = createSocketConnection()
        socket.emit("joinChat", {userID, targetID, firstName: user.firstName})
        socket.on("receiveMessage", ({firstName, lastName, text}) => {
             
           
            setMessage((prevMessages) => [...prevMessages, { firstName, text }]);
        })

        return  () => {
            socket.disconnect()
        }
    }, [userID, targetID])


    const sendMessage = () => {

        const socket = createSocketConnection()
        socket.emit("sendMessage", {userID, targetID, firstName: user.firstName, lastName:user.lastName, text: newMessage})
        setNewMessage("")
    }
  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
    <h1 className="p-5 border-b border-gray-600">Chat</h1>
    <div className="flex-1 overflow-scroll p-5">
     {message.map((msg, index) => {
       return (
        <div
          key={index}
         className= {"chat " + (user.firstName === msg.firstName ? "chat-end":"chat-start")}
        >
          <div className="chat-header">
           {`${msg.firstName} ${msg.lastName}`}
            <time className="text-xs opacity-50"> 2 hours ago</time>
          </div>
          <div className="chat-bubble">{msg.text}</div>
          <div className="chat-footer opacity-50">Seen</div>
        </div>
      );
     })}
       
      
    </div>
    <div className="p-5 border-t border-gray-600 flex items-center gap-2">
      <input
       value={newMessage} onChange={(e)=> setNewMessage(e.target.value)}
        className="flex-1 border border-gray-500 text-white rounded p-2"
      ></input>
      <button onClick={sendMessage}  className="btn btn-secondary">
        Send
      </button>
    </div>
  </div>
  )
}

export default Chat
