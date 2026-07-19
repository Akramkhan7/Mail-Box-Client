import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BsPaperclip, BsEmojiSmile, BsTrash } from "react-icons/bs";

function ComposeMail({ show, handleClose }) {
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

  const submitHandler = () => {
    console.log(mail);

    alert("Mail Sent Successfully!");

    setMail({
      to: "",
      subject: "",
      message: "",
    });

    handleClose();
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],

      ["bold", "italic", "underline", "strike"],

      [{ color: [] }, { background: [] }],

      [{ list: "ordered" }, { list: "bullet" }],

      [{ align: [] }],

      ["blockquote", "code-block"],

      ["link", "image"],

      ["clean"],
    ],
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Message</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>To</InputGroup.Text>

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
          style={{ height: "300px", marginBottom: "60px" }}
        />

        <hr />

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Button onClick={submitHandler}>Send</Button>

            <BsPaperclip size={20} style={{ cursor: "pointer" }} />

            <BsEmojiSmile size={20} style={{ cursor: "pointer" }} />
          </div>

          <BsTrash
            size={22}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleClose}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ComposeMail;
