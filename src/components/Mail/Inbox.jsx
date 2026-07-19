import { useEffect, useState, useRef } from "react";
import { Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DATABASE_URL } from "../../Firebase/Firebase";
import { mailActions } from "../Store/Mail-Slice";
import { useHistory } from "react-router-dom";

function Inbox() {
  const email = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const history = useHistory();

  const mails = useSelector((state) => state.mail.inbox);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const initialLoadRef = useRef(true);

  useEffect(() => {
    if (!email) return;

    fetchInbox();
    const interval = setInterval(() => {
      fetchInbox();
    }, 2000);

    return () => clearInterval(interval);
  }, [email]);

  const fetchInbox = async () => {
    if (initialLoadRef.current) setLoading(true);
    setError("");

    try {
      const userKey = email.trim().toLowerCase().replace(/[.@]/g, "");

      const response = await fetch(
        `${DATABASE_URL}/mail/inbox/${userKey}.json`,
      );

      if (!response.ok) {
        throw new Error("Failed to load inbox");
      }

      const data = await response.json();
      const loadedMails = [];

      for (const key in data) {
        loadedMails.push({
          id: key,
          ...data[key],
        });
      }

      loadedMails.reverse();

      dispatch(mailActions.setInbox(loadedMails));
    } catch (err) {
      console.log(err);
      setError("Could not load your inbox. Please try again.");
    } finally {
      setLoading(false);
      initialLoadRef.current = false;
    }
  };

  const openMail = (mail) => {
    history.push(`/mail/${mail.id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="m-4 shadow">
      <Card.Header>
        <h3 className="mb-0">Inbox</h3>
      </Card.Header>

      {error && (
        <Alert variant="danger" className="m-3 mb-0">
          {error}
        </Alert>
      )}

      <ListGroup variant="flush">
        {mails.length === 0 && !error && (
          <ListGroup.Item>No mails found.</ListGroup.Item>
        )}

        {mails.map((mail) => {
          const plainText = (mail.message || "").replace(/<[^>]+>/g, "");
          const preview =
            plainText.length > 80
              ? plainText.slice(0, 80) + "..."
              : plainText;

          return (
            <ListGroup.Item
              key={mail.id}
              action
              className="py-3"
              onClick={() => openMail(mail)}
            >
              <div className="d-flex justify-content-between">
                <div>
                  {!mail.read && (
                    <span
                      className="bg-primary rounded-circle d-inline-block me-2"
                      style={{
                        width: "10px",
                        height: "10px",
                      }}
                    />
                  )}

                  <strong>{mail.from}</strong>

                  <div className="fw-bold mt-1">{mail.subject}</div>

                  <small className="text-muted">{preview}</small>
                </div>

                <small className="text-muted">
                  {new Date(mail.createdAt).toLocaleDateString()}
                </small>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}

export default Inbox;