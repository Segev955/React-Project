import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../firebase";

import Offcanvas from "react-bootstrap/Offcanvas";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { ArrowLeft, ArrowRight, Cart } from "react-bootstrap-icons";
import "./CartStyles.css"; // We'll create this CSS file

import {
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  getDoc,
  increment,
  arrayUnion,
} from "firebase/firestore";
import ProductComp from "./product";

function ProductsComp() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get All Products
  useEffect(() => {
    const q = query(collection(db, "products"));
    onSnapshot(q, (qSnapshot) => {
      const prod = qSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(prod);
    });
  }, []);

  //Total
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setCartTotal(total);
  }, [cartItems]);

  function addToCart(product, quantity) {
    if (quantity == 0) {
      removeFromCart(product.id);
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity = quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          category: product.category,
          quantity: quantity,
        },
      ]);
    }
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  async function order() {
    const userId = JSON.parse(sessionStorage.getItem("user")).id;
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    const seeOrders = JSON.parse(sessionStorage.getItem("user")).seeOrders;

    const currentOrders = userDoc.data().orders || [];

    const newOrder = {
      items: cartItems.map((ci) => ({
        ...ci,
        date: new Date().toLocaleDateString("en-GB"),
      })),
      orderDate: new Date().toLocaleDateString("en-GB"),
    };
    console.log(newOrder);

    try {
      await updateDoc(userDocRef, { orders: [...currentOrders, newOrder] });

      if (seeOrders) {
        newOrder.items.forEach(async (item) => {
          const productDocRef = doc(db, "products", item.id);

          await updateDoc(productDocRef, {
            bought: increment(item.quantity),
            boughtby: arrayUnion(userId),
          });

          const categoryDocRef = doc(db, "categories", item.category);
          await updateDoc(categoryDocRef, { bought: increment(item.quantity) });
        });
      }

      alert("Orderd Sucsessfuly!");
      navigate("/logout");
    } catch (error) {
      alert("Orderd Failed!");
      console.log(error);
    }
  }

  return (
    <>
      <Container className="position-relative">
        <Button
          variant="primary"
          onClick={handleShow}
          className={`cart-toggle-button ${show ? "open" : ""}`}
        >
          {show ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
          <Cart size={20} className="ms-2" />
        </Button>

        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="cart-offcanvas"
        >
          <Offcanvas.Header>
            <Offcanvas.Title>Your Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <h5>{item.title}</h5>
                      <p>
                        {item.quantity} × ${item.price} = $
                        {(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}

                <div className="cart-summary">
                  <h4>Total: ${cartTotal.toFixed(2)}</h4>
                  <Button onClick={order} variant="success" className="w-100">
                    Place Order
                  </Button>
                </div>
              </>
            )}
          </Offcanvas.Body>
        </Offcanvas>
        <div className="products-grid mt-4">
          {products.map((product) => (
            <ProductComp
              key={product.id}
              product={product}
              onAddToCart={(quantity) => addToCart(product, quantity)}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

export default ProductsComp;
