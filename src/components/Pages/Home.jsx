import React from "react";
import { Button, Navbar, Container,Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Auth-Slice";
import Inbox from "../Mail/Inbox";

function Home() {
  const history = useHistory();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const unreadCount = useSelector((state) => state.mail.unreadCount);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };

  return (
    <div>
      <Navbar bg="white" className="shadow-sm px-4 py-3">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div>
            <strong>Mail Box</strong>
            {email && (
              <span className="text-muted ms-3" style={{ fontSize: "0.9rem" }}>
                Logged in as: {email}
              </span>
            )}

<Button
    onClick={() => history.push("/sent")}
>
    Sent
</Button>

            <Button variant="light">
              Inbox
              <Badge bg="primary" className="ms-2">
                {unreadCount}
              </Badge>
            </Button>
          </div>

          <div className="d-flex gap-2">
            <Button onClick={() => history.push("/compose")}>Compose</Button>
            <Button variant="outline-secondary" onClick={logoutHandler}>
              Logout
            </Button>
          </div>
        </Container>
      </Navbar>

      <div className="container mt-4">
        <Inbox />
      </div>
    </div>
  );
}

export default Home;
