import { Image } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GoogleLogin } from '@react-oauth/google';

import parkinglogin from '../assets/parkinglogo.png';
import { googleClientId } from '../utils/constants';
import { googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
export default function NavbarContainer() {

    const [userProfile, setProfile] = useState(JSON.parse(localStorage.getItem("loginInfo")));

    let navigate = useNavigate();


    const responseGoogle = (response) => {
        console.log(response.credential);
        axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`).then((response) => {
            localStorage.setItem("loginInfo", JSON.stringify(response.data));
            setProfile(response.data);
            window.location.reload()
        })
    }
    const onLogout = (response) => {
        googleLogout();
        navigate("/login")

                            localStorage.clear();
                            window.location.reload()

                            swal(
                                'Logged out!',
                                'log out successfully.',
                                'success'
                              )

    }
    return <Navbar bg="light" expand="lg" sticky='top' top="0">
        <Container>
            <Navbar.Brand href="#home">
                <Image src={parkinglogin} height={40} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><NavLink to="/"> Home </NavLink></Nav.Link>
                    <Nav.Link><NavLink to="/places">All Places</NavLink></Nav.Link>
                </Nav>
                    <Nav className="ml-auto">
                    {userProfile == null ? <Nav.Link><NavLink to="/login"> Login </NavLink></Nav.Link> : <>
                    <NavDropdown title={
                        (userProfile == null) ?
                            < GoogleLogin
                                clientId={googleClientId}
                                buttonText="Signin with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            /> : <>
                                {userProfile.name}
                            </>
                    } id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">
                            <Nav.Link> <NavLink to="/bookings"> View Bookings</NavLink></Nav.Link>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => {
                            onLogout()
                        }}>Logout</NavDropdown.Item>
                    </NavDropdown>
                            </>}


                    </Nav>
                    
                
            </Navbar.Collapse>
        </Container>
    </Navbar >
}