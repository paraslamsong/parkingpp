
import { Image } from 'react-bootstrap';
import parkinglogin from '../../assets/parkinglogo.png';
import { GoogleLogin } from '@react-oauth/google';


export default function LoginPage() {

    const responseGoogle = (response) => {
        console.log(response);
    }
    return <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: "100vh" }}>

        <Image src={parkinglogin} />
        <div style={{ height: 100 }} />

        <GoogleLogin
            clientId="188525358983-tc98ohm2p2ieg9are0r54qf3312obgop.apps.googleusercontent.com"
            buttonText="Signin with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />


    </div>
}