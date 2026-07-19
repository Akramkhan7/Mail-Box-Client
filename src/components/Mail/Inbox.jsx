import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { DATABASE_URL } from "../../Firebase/Firebase";

function Inbox() {
  const email = useSelector((state) => state.auth.email);

  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(email)
    fetchInbox();
  }, []);

  const fetchInbox = async () => {
    setLoading(true);

    try {
      const userKey = email.trim().toLowerCase().replace(/[.@]/g, "");

      const response = await fetch(
        `${DATABASE_URL}/mail/inbox/${userKey}.json`
      );

      const data = await response.json();
      console.log(data);

      const loadedMails = [];

      for (const key in data) {
        loadedMails.push({
          id: key,
          ...data[key],
        });
      }

      setMails(loadedMails);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  return (
    <Card className="m-4">
      <Card.Header>
        <h4>Inbox</h4>
      </Card.Header>

      <ListGroup variant="flush">

        {mails.length === 0 && (
          <ListGroup.Item>No mails found.</ListGroup.Item>
        )}

        {mails.map((mail) => (
          <ListGroup.Item key={mail.id}>

            <div className="d-flex justify-content-between">

              <div>
                <h6>{mail.from}</h6>

                <strong>{mail.subject}</strong>

                <div
                  dangerouslySetInnerHTML={{
                    __html: mail.message,
                  }}
                />
              </div>

              <small>
                {new Date(mail.createdAt).toLocaleString()}
              </small>

            </div>

          </ListGroup.Item>
        ))}

      </ListGroup>
    </Card>
  );
}

export default Inbox;