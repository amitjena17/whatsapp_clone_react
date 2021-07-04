import React , { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import AddCommentIcon from '@material-ui/icons/AddComment';
import "./SidebarChat.css";
import db from "./firebase";
import { Link } from "react-router-dom";
  

function SidebarChat(props) {
    const { id, name, addNewChat } = props;
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapshot => (
                    setMessages(snapshot.docs.map(doc => (
                        doc.data()
                    )))
                ))
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };


    return !addNewChat ? (
        <Link to={'/rooms/${id}'}>
            <div className="sidebarChat">
                 <Avatar src={'http://avatars.dicebear.com/api/human/${seed}.svg'} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>  
    ):(
        <div onClick={createChat} className="addNewChat">
            <AddCommentIcon />
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat;
