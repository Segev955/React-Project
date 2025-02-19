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
import TableComp from "../tableComp";

function CustomersComp() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (qSnapshot) => {
      const data = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const customer = data.filter((u) => !u.admin);
      setUsers(customer);
    });
  }, []);

  return (
    <TableComp
      headers={["Full Name", "Joined At", "Products Bought"]}
      data={users}
      renderRow={(user) => (
        <tr key={user.id}>
          <td>{`${user.firstName} ${user.lastName}`}</td>
          <td>{user.joindate || "N/A"}</td>
          <td>
            <TableComp
              headers={["Product", "Qty", "Date"]}
              data={user.orders?.flatMap((entry) => entry.items) || []}
              renderRow={(order, idx) => (
                <tr key={idx}>
                  <td>{order.title}</td>
                  <td>{order.quantity}</td>
                  <td>{order.date}</td>
                </tr>
              )}
            />
          </td>
        </tr>
      )}
    />
  );
}

export default CustomersComp;
