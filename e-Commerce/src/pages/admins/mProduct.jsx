import { useState, useEffect } from "react";
import db from "../../firebase";


import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  updateDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

function ManageProductComp({ tProduct }) {
  const [product, setProduct] = useState(tProduct);
  const [categories, setCategories] = useState([]);

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

  async function handleSave() {
    await updateDoc(doc(db, "products", product.id), product);
    alert(product.title + " Saved");
  }

  return (
    <Card className="p-4 shadow">
      <Form>
        <Row>
          {/* Title */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={product.title}
                onChange={(e) =>
                  setProduct({ ...product, title: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          {/* Price */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: +e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Category */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
              className="form-control"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                {categories.map((categorie) => {
                  return (
                    <option key={categorie.id} value={categorie.name}>
                      {categorie.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Image Link */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="imageLink">
              <Form.Label>Link to Pic</Form.Label>
              <Form.Control
                type="text"
                value={product.img}
                onChange={(e) =>
                  setProduct({ ...product, img: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          {/* Description */}
          <Col md={6}>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          {/* Bought By Table */}
          <Col md={6}>
            <h6>Bought By:</h6>
            <Table
              bordered
              hover
              size="sm"
              responsive
              className="w-auto text-center"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {product.boughtBy && product.boughtBy.length > 0 ? (
                  product.boughtBy.map((entry, idx) => (
                    <tr key={idx}>
                      <td>{entry.name}</td>
                      <td>{entry.qty}</td>
                      <td>{entry.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No one</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Card>
  );
}

export default ManageProductComp;
