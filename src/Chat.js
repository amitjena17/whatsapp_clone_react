import { Avatar, IconButton } from "@material-ui/core"; 
import { AttachFile, MoreVert, SearchOutlined, Send } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./Chat.css";
import db from "./firebase";
import firebase from "./firebase";
import { useStateValue } from "./StateProvider";


function Chat() {

    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot(snapshot => ( setRoomName(snapshot.data().name)));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => (
                    doc.data()
                )))
            ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    


    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("");
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h3>Discuss Group</h3>
                    <p>Last seen{" "} {
                        new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()
                    } </p>
                </div>

                <div className='chat__headerRight'>
                  <IconButton>
                    <SearchOutlined/> 
                  </IconButton>
                  <IconButton>
                    <AttachFile/> 
                  </IconButton>
                  <IconButton>
                    <MoreVert/> 
                  </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">
                            {message.name}
                        </span>
                        {message.message}
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                <input value={input} onChange={handleChange} placeholder="Enter a message" type="text" />
                </form>
                <IconButton onClick={sendMessage} type="submit">
                        <Send />
                    </IconButton>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat;
