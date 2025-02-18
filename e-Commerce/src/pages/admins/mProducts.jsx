import { useState, useEffect } from "react";
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

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import ManageProductComp from "./mProduct";

function ManageProductsComp() {
  const [products, setProducts] = useState([]);

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
  }, [products]);

  async function addNew() {
    console.log('here');
    
    const obj = {
      title: "",
      price: "",
      category: "",
      img: "",
      description: "",
      boughtby: [],
    };
    
    try {
      const data = await addDoc(collection(db, 'products'), obj)
      setProducts([...products, {...obj, id: data.id}])
    } catch (error) {
      console.error("Error adding new product: ", error);
      alert("Failed to add new product.");
      
    }
    
    
  }
  return (
    <Container>
      {products.length > 0 ? (
        products.map((product) => {
          return <ManageProductComp key={product.id} tProduct={product} />;
        })
      ) : (
        <div>No Products!</div>
      )}
      <br />
      <Button onClick={addNew} className="mr-2" variant="primary" size="sm">
        Add New
      </Button>
    </Container>
  );
}

export default ManageProductsComp;
