import React from "react";
import { Button } from "@material-ui/core";
import GoogleButton from 'react-google-button';
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import './Login.css';

function Login({ loading }) {
  const [{ }, dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider).then(result => {
        dispatch({
            type: actionTypes.SET_USER,
            user: result.user
        })
    }).catch(error => (
        alert(error.message)
    ))
  };
  return (
    <div>
                <div className="login">
                    <div className="login__container">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/597px-WhatsApp.svg.png"
                            alt=""
                        />
                        <div className="login__text">
                            <h1>Sign in to Whatsapp</h1>
                        </div>
                        <Button onClick={signIn} >
                            <GoogleButton type="light" />
                        </Button>
                    </div>
                </div>
    </div>
  );
}

export default Login;
