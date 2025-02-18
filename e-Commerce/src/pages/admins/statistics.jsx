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

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
  "#9966FF", "#FF9F40", "#FFCD56", "#4BC0C0",
  "#36A2EB", "#FF6384", "#FF9F40", "#9966FF"
];
function StatisticsComp() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const q = query(collection(db, "users"));
    onSnapshot(q, (qSnapshot) => {
      const user = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const customer = user.filter((u) => !u.admin);
      setCustomers(customer);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (qSnapshot) => {
      const pro = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(pro);
    });
  }, []);

  const renderCustomLabel = ({ title, bought }) => {
    return `${title}: ${bought}`;
  };

  const filteredData = customers
    .filter((customer) => customer.id === selectedCustomer)
    .flatMap((customer) => customer.orders.flatMap((order) => order.items))
    .reduce((acc, item) => {
      if (acc[item.title]) {
        acc[item.title].qty += item.quantity;
      } else {
        acc[item.title] = { name: item.title, qty: item.quantity };
      }
      return acc;
    }, {});

  const aggregatedData = Object.values(filteredData);

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <h2 className="text-center mb-4">Total Sold Products</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={products}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="bought"
          >
            {products.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <br /> <br />
      <Container>
        <h2 className="text-center mb-4">Product Sales per Customer</h2>
        <Form.Group>
          <Form.Label>Select Customer:</Form.Label>
          <Col sm={4}>
            <Form.Select
              className="form-control"
              onChange={(e) => setSelectedCustomer(e.target.value)}
              value={selectedCustomer}
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={aggregatedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="qty" >
            {aggregatedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
        ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Container>
    </>
  );
}

export default StatisticsComp;
