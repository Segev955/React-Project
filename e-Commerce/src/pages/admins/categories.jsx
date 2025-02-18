import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategorieComp from "./categorie";

function CategoriesComp() {
  const [categories, setCategories] = useState([]);
  const [cName, setCName] = useState("");

  useEffect(() => {
    const q = query(collection(db, "categories"));
    onSnapshot(q, (qSnapshot) => {
      const categ = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setCategories(categ);
    });
  }, []);

  async function addCategorie(e) {
    e.preventDefault();

    await addDoc(collection(db, "categories"), { name: cName });
  }

  async function removeCategorie(id) {
    await deleteDoc(doc(db, "categories", id));
  }

  async function updateCategorie(id, name) {
    await updateDoc(doc(db, "categories", id), { name: name });
  }

  return (
    <Form onSubmit={addCategorie}>
      <Container>
        <h2 className="text-center mb-4">Categories</h2>
        <Form.Group>
          {categories.map((categorie) => {
            return (
              <CategorieComp
                key={categorie.id}
                categorie={categorie}
                removeCategorie={removeCategorie}
                updateCategorie={updateCategorie}
              />
            );
          })}
        </Form.Group>
        <br /> <br />
        <Form.Group as={Row}>
          <Col sm={4}>
            <Form.Control
              type="name"
              placeholder="Add new category"
              required
              onChange={(e) => setCName(e.target.value)}
            />
          </Col>
          <Col>
          <Button variant="success" type="submit">
            Add
          </Button>
          </Col>
          
        </Form.Group>
      </Container>
    </Form>
  );
}

export default CategoriesComp;
