import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ComposeMail from "./ComposeMail";

function Home() {
  const [showCompose, setShowCompose] = useState(false);

  return (
    <div className="container mt-5">

      <Button
        onClick={() => setShowCompose(true)}
      >
        Compose
      </Button>

      <ComposeMail
        show={showCompose}
        handleClose={() => setShowCompose(false)}
      />

    </div>
  );
}

export default Home;