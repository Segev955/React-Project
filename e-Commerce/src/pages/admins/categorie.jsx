import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function CategorieComp({ categorie, removeCategorie, updateCategorie }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [cName, setCName] = useState("");

  function update() {
    if (!isDisabled) updateCategorie(categorie.id, cName);
    setIsDisabled(!isDisabled);
  }

  useEffect(() => {
    setCName(categorie.name);
  }, [categorie]);

  return (
<Container>
  <Form.Group className="mb-3" as={Row}>
    {/* Column for Input Field */}
    <Col sm={4}>
      <Form.Control
        id="update"
        placeholder={categorie.name}
        disabled={isDisabled}
        defaultValue={categorie.name}
        onChange={(e) => setCName(e.target.value)}
      />
    </Col>

    {/* Column for Buttons */}
    <Col sm={6} className="d-flex align-items-center">
      <Button onClick={update} className="me-2" variant="dark" size="sm">
        Update
      </Button>
      <Button
        onClick={() => removeCategorie(categorie.id)}
        variant="dark"
        size="sm"
      >
        Remove
      </Button>
    </Col>
  </Form.Group>
</Container>

  );
}

export default CategorieComp;
