import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import TableComp from "../tableComp";

function MyOrdersComp() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      const userId = JSON.parse(sessionStorage.getItem("user")).id;
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      const currentOrders = userDoc.data().orders || [];

      setOrders(currentOrders.map((ord) => ord.items));
    }
    getOrders();
  }, []);

  return (
    <Container>
      <h3>Orders</h3>
      <TableComp
        headers={["Title", "Qty", "Total", "Date"]}
        data={orders.flat() || []}
        renderRow={(o, idx) => (
          <tr key={idx}>
            <td>{o.title}</td>
            <td>{o.quantity}</td>
            <td>{o.price * o.quantity + "$"}</td>
            <td>{o.date}</td>
          </tr>
        )}
      />
    </Container>
  );
}

export default MyOrdersComp;
