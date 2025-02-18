import { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function RegisterComp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    joindate: new Date().toLocaleDateString("en-GB"),
    seeOrders: false,
  });

  async function handelSubmit(e) {
    e.preventDefault();
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = querySnapshot.docs.map((doc) => doc.data());

    const same = users.find((u) => u.username === user.username);
    if (same) {
      alert("Username already exists");
      return;
    }
    try {
      addDoc(collection(db, "users"), user);
      alert("User Signup successfully!");
      navigate('/')
    } catch (error) {
      console.error("Error creating profile: ", error);
      alert("Failed to signup profile.");
    }
    

  }

  return (
    <Form onSubmit={handelSubmit}>
      <Container>
        <h2 className="text-center mb-4">New User Registration</h2>
        <Form.Group className="mb-3" controlId="formBasicFName">
          <Form.Label>First Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter First Name"
            required
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLName">
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Last Name"
            required
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            required
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Allow others to see my orders"
            onChange={(e) => setUser({ ...user, seeOrders: e.target.checked })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>{" "}
      </Container>
    </Form>
  );
}

export default RegisterComp;
