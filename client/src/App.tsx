import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import LoginModal from "./components/LoginModal";
import Navigation from "./components/Navigation";
import SignUpModal from "./components/SignupModal";
import { User } from "./models/user";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        user && setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <Navigation
        loggedInUser={loggedInUser}
        onLoginClicked={() => {
          setShowLoginModal(true);
        }}
        onSignUpClicked={() => {
          setShowSignUpModal(true);
        }}
        onLogoutSuccess={() => {
          setLoggedInUser(null);
        }}
      />
      <Container className={styles.notesPage}>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => {
            setShowSignUpModal(false);
          }}
          onSignUpSuccesses={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLoginSuccesses={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
}

export default App;
