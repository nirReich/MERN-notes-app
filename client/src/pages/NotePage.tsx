import React from "react";
import { Container } from "react-bootstrap";
import { User } from "../models/user";
import NotesPageLoggedInView from "../components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";

type Props = { loggedInUser: User | null };

function NotePage({ loggedInUser }: Props) {
  return (
    <Container className={styles.notesPage}>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
}

export default NotePage;
