import { Button } from 'react-bootstrap';

type Props = {
    onSingUpClicked: ()=>void
    onLoginClicked: ()=>void
}

function NavBarLoggedOutView({onSingUpClicked,onLoginClicked}: Props) {


  return (
    <>
    <Button onClick={onSingUpClicked}>Sign Up</Button>
    <Button onClick={onLoginClicked}>Log In</Button>
    </>
  )
}

export default NavBarLoggedOutView