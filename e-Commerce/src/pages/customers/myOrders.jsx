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
      <Table
        striped
        bordered
        hover
        size="sm"
        responsive
        className="w-auto text-center"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Qty</th>
            <th>total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((ord) => {
            return ord.map((o,index) => {
              return (
                <tr key={index}>
                  <td>{o.title}</td>
                  <td>{o.quantity}</td>
                  <td>{o.price*o.quantity + '$'}</td>
                  <td>{o.date}</td>
                </tr>
              );
            });
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default MyOrdersComp;
