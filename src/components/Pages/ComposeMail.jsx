import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";

import {
  BsPaperclip,
  BsEmojiSmile,
  BsLink45Deg,
  BsTypeBold,
  BsTypeItalic,
  BsTrash,
  BsThreeDots,
} from "react-icons/bs";

function ComposeMail({ show, handleClose }) {
  

  const submitHandler = () => {
    alert("Mail Sent");
  };

  return (
    <Modal size="xl" centered>
      <Modal.Body className="p-4">
        {/* To */}

        <InputGroup className="border-bottom mb-3">
          <InputGroup.Text className="bg-white border-0">To</InputGroup.Text>

          <Form.Control
            type="email"
            name="to"
            placeholder="Recipient"
            className="border-0 shadow-none"
          />

          <span className="text-secondary mt-2 me-2">Cc / Bcc</span>
        </InputGroup>

        {/* Subject */}

        <Form.Control
          className="border-0 border-bottom rounded-0 shadow-none mb-3"
          placeholder="Subject"
          name="subject"
        />

        {/* Message */}

        <Form.Control
          as="textarea"
          rows={18}
          placeholder="Compose your message..."
          name="message"
          className="border-0 shadow-none"
        />

        <hr />

        {/* Footer */}

        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-3">
            <Button >Send</Button>

            <BsPaperclip size={20} />

            <BsEmojiSmile size={20} />

            <BsLink45Deg size={20} />

            <BsTypeBold size={20} />

            <BsTypeItalic size={20} />

            <BsThreeDots size={20} />
          </div>

          <BsTrash size={22} className="text-danger" role="button" />
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ComposeMail;
