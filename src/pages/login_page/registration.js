
import { Image } from 'react-bootstrap';


export default function Registration() {

    
    return <div  >
    <div class="login-page">
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>Registration</h3>
            <p>Please enter your details to register.</p>
          </div>
        </div>
        <form class="login-form">
          <input type="text" placeholder="first name"/>
          <input type="text" placeholder="last name"/>
          <input type="text" placeholder="phone number"/>
          <input type="text" placeholder="address"/>
          <input type="text" placeholder="email"/>
          <input type="password" placeholder="password"/>
          <button>Register</button>
          <p class="message">Already have an account <a href="/login">Login </a></p>
        </form>
      </div>
    </div>
    </div>
}