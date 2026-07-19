import React from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  return (
    <>
   
  <header>
    
  </header>
    <div className="container mt-5">
      <Button onClick={() => history.push("/compose")}>Compose</Button>
    </div>
     </>
  );
}

export default Home;