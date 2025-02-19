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
import TableComp from "../tableComp";

function ManageProductComp({ tProduct }) {
  const [product, setProduct] = useState(tProduct);
  const [categories, setCategories] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  useEffect(() => {
    // Fetch categories
    const q = query(collection(db, "categories"));
    onSnapshot(q, (qSnapshot) => {
      const categ = qSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categ);
    });

    // Fetch users and create a map (userId -> username)
    const fetchUsers = async () => {
      const usersSnapshot = await onSnapshot(
        query(collection(db, "users")),
        (snapshot) => {
          const users = {};
          snapshot.docs.forEach((doc) => {
            const userData = doc.data();
            users[doc.id] = `${userData.firstName} ${userData.lastName}`;
          });
          setUsersMap(users);
        }
      );
    };

    fetchUsers();
  }, []);

  async function handleSave() {
    await updateDoc(doc(db, "products", product.id), product);
    alert(product.title + " Saved");
  }

  async function remove() {
    await deleteDoc(doc(db, "products", product.id));
    alert(product.title + " Removed");
  }

  async function getName(userId) {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      return `${userData.firstName} ${userData.lastName}`;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return "Error";
    }
  }

  return (
    <Card className="p-4 shadow mb-2">
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
                    <option key={categorie.id} value={categorie.id}>
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
            <TableComp
              headers={["Name", "Qty", "Date"]}
              data={product.boughtby || []}
              renderRow={(pro, idx) => (
                <tr key={idx}>
                  <td>{usersMap[pro.userId] || ""}</td>
                  <td>{pro.qty}</td>
                  <td>{pro.date}</td>
                </tr>
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-start">
            <Button variant="success" onClick={handleSave} className="me-2">
              Save
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="danger" onClick={remove}>
              Remove
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default ManageProductComp;
