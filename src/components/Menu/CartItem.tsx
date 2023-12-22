import { Button } from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useState } from "react";

type CartItemProps = {
  id: number;
  quantity: number;
  name: string; // Add name to identify the item
  price: number;
};

export function CartItem({ id, quantity, name,price }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
      <div>
        {name}{" "}
        {quantity > 1 && (
          <span style={{ fontSize: ".65rem", color: "gray" }}>
            x{quantity}
          </span>
        )}
        <span> =  {price * quantity} $</span>
       

      </div>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => removeFromCart(id)}
      >
        &times;
      </Button>
    </div>
  );
}
