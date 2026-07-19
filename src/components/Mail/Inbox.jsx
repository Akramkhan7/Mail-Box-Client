import { useEffect, useState } from "react";
import { Card, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { DATABASE_URL } from "../../Firebase/Firebase";

function Inbox() {
  const email = useSelector((state) => state.auth.email);
  console.log(email);

  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      fetchInbox();
    }
  }, [email]);

  const fetchInbox = async () => {
    setLoading(true);
    setError("");

    try {
      const userKey = email.trim().toLowerCase().replace(/[.@]/g, "");

      const response = await fetch(
        `${DATABASE_URL}/mail/inbox/${userKey}.json`
      );

      if (!response.ok) {
        throw new Error("Failed to load inbox");
      }

      
      const data = await response.json();
      console.log(data);

      const loadedMails = [];

      for (const key in data) {
        loadedMails.push({
          id: key,
          ...data[key],
        });
      }

      loadedMails.reverse();

      setMails(loadedMails);
    } catch (err) {
      console.log(err);
      setError("Could not load your inbox. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openMail = (mail) => {
    // hook this up to a detail view / route later
    console.log("Open mail:", mail);
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
          const plainText = mail.message.replace(/<[^>]+>/g, "");
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
                    <Badge bg="primary" className="me-2">
                      ●
                    </Badge>
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