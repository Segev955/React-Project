import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { PlusCircle, DashCircle } from "react-bootstrap-icons";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

function ProductComp({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  function handleInputChange(e) {
    let value = e.target.value;

    if (value === "") {
      setQuantity("");
    } else {
      const num = parseInt(value, 10);
      setQuantity(isNaN(num) ? 0 : num);
    }
  }

  useEffect(() => {
    onAddToCart(quantity);
  }, [quantity]);
  

  function handleBlur() {
    if (quantity === "") {
      setQuantity(0);
    }
  }
  function increaseQty() {
    setQuantity((prev) => prev + 1);
  }

  function decreaseQty() {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function handleAddToCart() {
    if (quantity > 0) {      
      onAddToCart(quantity);
    }
  }

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <div className="w-80 d-flex justify-content-center">
            <Card.Img
              variant="top"
              src={product.img}
              style={{ width: "150px" }}
            />
          </div>
          <div className="w-50">
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: {product.price}</Card.Text>
            <Card.Text>In Stock: 5</Card.Text>
            <Card.Text>Bought: 15</Card.Text>
          </div>
        </Card.Body>

        <div className="d-flex align-items-center justify-content-between px-3">
          <Button variant="outline-secondary" onClick={decreaseQty}>
            <DashCircle size={24} />
          </Button>

          <Form.Control
            type="text"
            value={quantity}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="mx-2 text-center"
            style={{ width: "60px" }}
          />
          <Button variant="outline-secondary" onClick={increaseQty}>
            <PlusCircle size={24} />
          </Button>
        </div>
        <br />
      </Card>
      <br />
    </>
  );
}

export default ProductComp;
