import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function MyAccountComp() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const userData = JSON.parse(sessionStorage.getItem("user"));
      const q = query(
        collection(db, "users"),
        where("username", "==", userData.username)
      );

      const querySnapshot = await getDocs(q);
      const docSnap = querySnapshot.docs[0];
      setUser({ id: docSnap.id, ...docSnap.data() });
    }
    getUser();
  }, []);

  async function handelSubmit(e) {
    e.preventDefault();

    try {
      await updateDoc(doc(db, "users", user.id), user);
      sessionStorage.clear();
      alert("Profile updated successfully!");
      navigate('/')
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  }

  return (
    <Form onSubmit={handelSubmit}>
      <Container>
        <Form.Group className="mb-3" controlId="formBasicFName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter First Name"
            required
            defaultValue={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Last Name"
            required
            defaultValue={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            required
            disabled
            defaultValue={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            defaultValue=""
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Allow others to see my orders"
            defaultChecked={user.seeOrders}
            onChange={(e) => setUser({ ...user, seeOrders: e.target.checked })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>{" "}
      </Container>
    </Form>
  );
}

export default MyAccountComp;
