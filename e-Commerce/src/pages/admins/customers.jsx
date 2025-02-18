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
  query,
} from "firebase/firestore";

function CustomersComp() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (qSnapshot) => {
      const data = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setUsers(data);
    });
  }, []);

  return (
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
          <th>Full Name</th>
          <th>Joined At</th>
          <th>Products Bought</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>05/05/2005</td>
              <td>
                <Table bordered size="sm" className="text-center w-auto">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.orders && user.orders.length > 0 ? (
                      user.orders.map((entry) => {
                        return entry.items.map((o,idx) => {
                          return (
                            <tr key={idx}>
                              <td>{o.title}</td>
                              <td>{o.quantity}</td>
                              <td>{o.date}</td>
                            </tr>
                          );
                        });
                      })
                    ) : (
                      <tr>
                        <td colSpan="3">Empty</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CustomersComp;
