import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export function StoreItem({ id, name, price, image }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    addToCart,
  } = useShoppingCart();

  const quantity: number = getItemQuantity(id);

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };

  const handleIncreaseQuantity = (id) => {
    increaseCartQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    decreaseCartQuantity(id);
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia component="img" height="200" src={image} alt={name} />
      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {formatCurrency(price)}
        </Typography>
        <CardActions sx={{ mt: "auto" }}>
          {quantity === 0 ? (
            <Button fullWidth onClick={handleAddToCart}>
              + Add To Cart
            </Button>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: ".5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: ".5rem",
                }}
              >
                <Button onClick={() => handleDecreaseQuantity(id)}  >-</Button>
                <Typography variant="h5">{quantity}</Typography>
                <Button onClick={() => handleIncreaseQuantity(id)} >+</Button>
              </div>
              <Typography variant="subtitle1">in cart</Typography>
              <Button onClick={() => handleRemoveFromCart(id)} variant="contained" size="small">
                Remove
              </Button>
            </div>
          )}
        </CardActions>
      </CardContent>
    </Card>
  );
}
