import React, { useEffect,useState } from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    console.log(loading);
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        setLoading(false);
        console.log(authUser);
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login loading={loading} />
      ) : (
       <div className="app__body">
        <Router>
           <Sidebar />

           <Switch>
             <Route path="/rooms/:roomId">
              <Chat />
             </Route>
             <Route path="/">
               <Chat />
             </Route>
            </Switch>
        </Router>  
      </div>
      )}
    </div>
  );
}

export default App;
