import React, { useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import {
  BsArrowLeft,
  BsPaperclip,
  BsEmojiSmile,
  BsTrash,
} from "react-icons/bs";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { DATABASE_URL } from "../../Firebase/Firebase";
import { useSelector } from "react-redux";

function ComposeMail() {
  const history = useHistory();
  const senderEmail = useSelector((state) => state.auth.email);

  const [mail, setMail] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const changeHandler = (e) => {
    setMail({
      ...mail,
      [e.target.name]: e.target.value,
    });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link"],
      ["clean"],
    ],
  };

 const submitHandler = async () => {
  if (!mail.to || !mail.subject) {
    alert("Please fill in recipient and subject");
    return;
  }

  try {
    const senderKey = senderEmail.replace(/[.@]/g, "");
    const receiverKey = mail.to.replace(/[.@]/g, "");

    const mailData = {
      from: senderEmail,
      to: mail.to,
      subject: mail.subject,
      message: mail.message,
      read: false,
      createdAt: new Date().toISOString(),
    };

    // Save in sender's sent box
    const sentRes = await fetch(`${DATABASE_URL}/mail/sent/${senderKey}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailData),
    });

    // Save in receiver's inbox
    const inboxRes = await fetch(`${DATABASE_URL}/mail/inbox/${receiverKey}.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailData),
    });

    if (!sentRes.ok || !inboxRes.ok) {
      throw new Error("Failed to send mail");
    }

    alert("Mail Sent Successfully!");

    setMail({ to: "", subject: "", message: "" });
    history.push("/home");
  } catch (err) {
    console.log(err);
    alert("Failed to send mail. Please try again.");
  }
};

  return (
    <Container fluid className="bg-dark min-vh-100 py-4">

      <Card
        className="mx-auto shadow"
        style={{ maxWidth: "1200px", minHeight: "85vh" }}
      >

        <Card.Header className="bg-white border-0">

          <div className="d-flex align-items-center">

            <BsArrowLeft
              size={22}
              role="button"
              className="me-3"
              onClick={() => history.push("/home")}
            />

            <h5 className="mb-0">New Message</h5>

          </div>

        </Card.Header>

        <Card.Body>

          <InputGroup className="mb-3">

            <InputGroup.Text className="bg-white">
              To
            </InputGroup.Text>

            <Form.Control
              type="email"
              placeholder="Recipient"
              name="to"
              value={mail.to}
              onChange={changeHandler}
            />

          </InputGroup>

          <Form.Control
            className="mb-3"
            placeholder="Subject"
            name="subject"
            value={mail.subject}
            onChange={changeHandler}
          />

          <ReactQuill
            theme="snow"
            value={mail.message}
            onChange={(value) =>
              setMail({
                ...mail,
                message: value,
              })
            }
            modules={modules}
            style={{ height: "400px", marginBottom: "60px" }}
          />

        </Card.Body>

        <Card.Footer className="bg-white">

          <Row className="align-items-center">

            <Col className="d-flex align-items-center gap-3">

              <Button onClick={submitHandler}>
                Send
              </Button>

              <BsPaperclip
                size={20}
                role="button"
              />

              <BsEmojiSmile
                size={20}
                role="button"
              />

            </Col>

            <Col xs="auto">

              <BsTrash
                size={22}
                role="button"
                className="text-danger"
              />

            </Col>

          </Row>

        </Card.Footer>

      </Card>

    </Container>
  );
}

export default ComposeMail;