import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import db from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

function LoginComp({ setMainUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    const q = query(collection(db, "users"));
    onSnapshot(q, (qSnapshot) => {
      const allUsers = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const findUser = allUsers.find((u) => u.username == user.username);
      if (findUser) {
        if (findUser.password == user.password) {
          const userToStore = {
            username: findUser.username,
            id: findUser.id,
            admin: findUser.admin,
            seeOrders: findUser.seeOrders
          };
          sessionStorage.setItem("user", JSON.stringify(userToStore));
          setMainUser(userToStore);
          findUser.admin ? navigate("/categories") : navigate("/products");
        } else alert("Wrong Password");
      } else alert("No such Username");
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <h2 className="text-center mb-4">Next Generation E-Commerce</h2>
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
        <Button variant="primary" type="submit">
          Login
        </Button>{" "}
        <br /> <br />
        New User? <Link to="/register">Register</Link>
      </Container>
    </Form>
  );
}

export default LoginComp;
