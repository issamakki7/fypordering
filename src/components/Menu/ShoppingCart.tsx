import { Drawer, Stack, Typography, Button } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";

type ShoppingCartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7287/api/Resto/Menu`).then((response) => {
      setStoreItems(response.data);
    });
  }, []);
  const { cartItems } = useShoppingCart();

  console.log(cartItems)

  const handleSubmit = () => {
    const submitArray = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    console.log(submitArray)
    console.log(JSON.parse(localStorage.getItem("currentUser")).reservationId)

    axios
    .post(`https://localhost:7287/api/Resto/Order/${JSON.parse(localStorage.getItem("currentUser")).reservationId}`, {
        reservationId: JSON.parse(localStorage.getItem("currentUser")).reservationId,
        plate: submitArray,
    })
    .then(response => {
      // console.log(response.data)
      alert("Order Sent Successfully")
      // localStorage.clear();
    
    })
    .catch(error =>{
      console.log(error)
      alert("Error")
      // alert(error.response.data);
    
    })
   
  };


  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography variant="h6" component="div">
          Cart
        </Typography>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))
      }
        <div
          style={{ marginLeft: "auto", fontWeight: "bold", fontSize: "1.2rem" }}
        >
          Total{" "}
          {formatCurrency(
            cartItems.reduce((total, cartItem) => {
              return total + (cartItem?.price || 0) * cartItem.quantity;
            }, 0),
          )}
        </div>
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Drawer>
  );
}
