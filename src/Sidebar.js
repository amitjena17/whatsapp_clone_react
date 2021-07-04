import React, {useEffect, useState} from "react";
import { Avatar, Button, IconButton } from "@material-ui/core"; 
import DonutLargeIcon from "@material-ui/icons/DonutLarge"; 
import ChatIcon from "@material-ui/icons/Chat"; 
import MoreVertIcon from "@material-ui/icons/MoreVert"; 
import { SearchOutlined } from "@material-ui/icons"; 
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
      const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
        return (
            setRooms(snapshot.docs.map((doc) => {
                return ({
                    id: doc.id,
                    data: doc.data()
                })
            }))
        )
      });
      return () => {
        unsubscribe();
      }
    }, []);

    const signOut = () => {
      firebase.auth().signOut().then(function () {
          dispatch({
              type: "SET_USER",
              user: null
          })
      }).catch(function (error) {
          alert(error.message)
      });
  }

    return (
        <div className="sidebar">   
          <div className="sidebar__header"> 
                <Button onClick={signOut}>
                    <Avatar src={user?.photoURL} />
                </Button>
          <div className="sidebar__headerRight">
              <IconButton>
                <DonutLargeIcon/> 
              </IconButton>
              <IconButton>
                <ChatIcon/> 
              </IconButton>
              <IconButton>
                <MoreVertIcon/> 
              </IconButton>   
            </div>
        </div>
        
          <div className="sidebar__search">
            <div className="sidebar__searchContainer">
              <SearchOutlined />
              <input placeholder="Search or start new chat" type="text"/> 
            </div> 
          </div> 

          <div className="sidebar__chats"> 
            <SidebarChat addNewChat/>
            {rooms.map(room =>(
              <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
          </div>  
        </div>
    )
}

export default Sidebar;
