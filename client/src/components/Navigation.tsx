import { Container, Nav, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import NavBarLoggedInView from './NavBarLoggedInView';
import NavBarLoggedOutView from './NavBarLoggedOutView';

type Props = {
    loggedInUser: User | null;
    onSignUpClicked:()=>void;
    onLoginClicked:()=>void;
    onLogoutSuccess:()=>void;
}

function Navigation({loggedInUser, onLoginClicked, onLogoutSuccess, onSignUpClicked}: Props) {
  return (
    <Navbar bg='primary' variant='dark' expand="sm" sticky='top'>
        <Container>
            <Navbar.Brand>
                MERN NOTES APP
            </Navbar.Brand>
           <Navbar.Toggle aria-controls='main-navbar'/>
           <Navbar.Collapse id='main-navbar'>
                <Nav className='ms-auto'>
                    {
                        loggedInUser ? <NavBarLoggedInView user={loggedInUser} onLogOutSuccesses={onLogoutSuccess}/> : <NavBarLoggedOutView onLoginClicked={onLoginClicked} onSingUpClicked={onSignUpClicked}/>
                    }
                </Nav>
           </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}

export default Navigation