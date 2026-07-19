import { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DATABASE_URL } from "../../Firebase/Firebase";
import { mailActions } from "../Store/Mail-Slice";
import useApi from "../Hooks/ useApi"

function Sent() {
  const email = useSelector((state) => state.auth.email);
  const sentMails = useSelector((state) => state.mail.sent);
const{request} = useApi();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (email) {
      fetchSent();
    }
  }, [email]);

  const fetchSent = async () => {
    setLoading(true);

    try {
      const userKey = email.trim().toLowerCase().replace(/[.@]/g, "");

      const data = await request(`${DATABASE_URL}/mail/sent/${userKey}.json`);

     

      console.log(data);

      const loadedMails = [];

      for (const key in data) {
        loadedMails.push({
          id: key,
          ...data[key],
        });
      }

      loadedMails.reverse();

      dispatch(mailActions.setSent(loadedMails));
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const openMail = (mail) => {
    history.push(`/sent/${mail.id}`);
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
        <h3>Sent Mail</h3>
      </Card.Header>

      {error && <Alert variant="danger">{error}</Alert>}

      <ListGroup variant="flush">
        {sentMails.length === 0 && (
          <ListGroup.Item>No sent mails.</ListGroup.Item>
        )}

        {sentMails.map((mail) => {
          const preview = mail.message.replace(/<[^>]+>/g, "").slice(0, 80);

          return (
            <ListGroup.Item key={mail.id} action onClick={() => openMail(mail)}>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>To : {mail.to}</strong>

                  <div className="fw-bold">{mail.subject}</div>

                  <small className="text-muted">{preview}...</small>
                </div>

                <small>{new Date(mail.createdAt).toLocaleDateString()}</small>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </Card>
  );
}

export default Sent;
