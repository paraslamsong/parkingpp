
import '../../App.css'

import { GoogleLogin } from '@react-oauth/google';
import { googleClientId } from '../../utils/constants';
import axios from 'axios';
import swal from 'sweetalert2';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
    // const [userProfile, setProfile] = useState(JSON.parse(localStorage.getItem("loginInfo")));
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const responseGoogle = (response) => {
        console.log(response.credential);
        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`).then((response) => {
            localStorage.setItem("loginInfo", JSON.stringify(response.data));
        })
          navigate("/")

          window.location.reload()
    }
    const login = () =>{
        // console.log(email,password);
        const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  console.log(email,password, 'hi')
  // Signed in 
    const user = userCredential.user;
    console.log(user)
    localStorage.setItem("loginInfo", JSON.stringify(user));
    // navigate("/")
console.log('sujk');
    // window.location.reload()
    // ...
  })
  .catch((error) => {
    console.log('errr');
    const errorCode = error.code;
    const errorMessage = error.message;
  });
    }

    
    return <div >
   <div class="login-page">
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form class="login-form">
          <input type="text"  onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <input type="password"   onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
          <button onClick={() => login()}>login</button>
          <p class="message">Not registered? <a href="/registration">Create an account</a></p>
          < GoogleLogin
                                clientId={googleClientId}
                                buttonText="Signin with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
        </form>
      </div>
    </div>    

    </div>
}