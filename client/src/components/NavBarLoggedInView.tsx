import { Button, Navbar } from 'react-bootstrap';
import { User } from '../models/user';
import * as NotesApi from "../network/notes_api";

type Props = {
    user:User
    onLogOutSuccesses: ()=>void
}

function NavBarLoggedInView({user,onLogOutSuccesses}: Props) {

    async function logout( ) {
        try {
            await NotesApi.logout();
            onLogOutSuccesses()
        } catch (error) {
            console.log(error);
            alert (error)
        }
        
    }


  return (
    <>
    <Navbar.Text className='me-2'>
        Signed in as: {user.username}
    </Navbar.Text>
    <Button onClick={logout}>Log Out</Button>
    </>
  )
}

export default NavBarLoggedInView