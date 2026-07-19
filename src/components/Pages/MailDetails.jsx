import { useEffect } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DATABASE_URL } from "../../Firebase/Firebase";
import { mailActions } from "../Store/Mail-Slice";

function MailDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const email = useSelector((state) => state.auth.email);

  const mail = useSelector((state) =>
    state.mail.inbox.find((item) => item.id === id),
  );

  useEffect(() => {
    if (mail && !mail.read) {
      markAsRead();
    }
  }, [mail]);

  const markAsRead = async () => {
    try {
      const userKey = email.trim().toLowerCase().replace(/[.@]/g, "");

      await fetch(`${DATABASE_URL}/mail/inbox/${userKey}/${id}.json`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          read: true,
        }),
      });

      dispatch(mailActions.markAsRead(id));
    } catch (err) {
      console.log(err);
    }
  };

  if (!mail) {
    return (
      <div className="container mt-5">
        <h3>Mail not found.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="shadow">
        <Card.Header>
          <h3>{mail.subject}</h3>

          <p className="mb-0">
            <strong>From:</strong> {mail.from}
          </p>

          <p className="mb-0">
            <strong>To:</strong> {mail.to}
          </p>

          <small className="text-muted">
            {new Date(mail.createdAt).toLocaleString()}
          </small>
        </Card.Header>

        <Card.Body>
          <div
            dangerouslySetInnerHTML={{
              __html: mail.message,
            }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default MailDetails;
