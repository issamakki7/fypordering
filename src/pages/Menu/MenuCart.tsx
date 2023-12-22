import { Container, Grid, Typography } from "@mui/material";
import { StoreItem } from "../../components/Menu/StoreItem";
import "./MenuCart.css";
import axios from "axios";
import { useEffect, useState } from "react";

export function Store() {
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:7287/api/Resto/Menu`).then((response) => {
      setStoreItems(response.data);
      console.log(response.data)
    });
  }, []);

  // Group store items by category
  const groupedItems = storeItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Container>
    <Typography
      style={{
        marginTop: "7rem",
        textAlign: "center",
      }}
      className="menu-main"
      variant="h1"
      component="h1"
    >
      Menu
    </Typography>

    {storeItems.map((categoryData) => (
      <div key={categoryData.category}>
        <Container className="category">
          <Typography className="menu-title" variant="h2" component="h2">
            {categoryData.category}
          </Typography>
          <hr className={`line-${categoryData.category.toLowerCase()}`}></hr>
          <Grid container spacing={3}>
            {categoryData.plates.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                <StoreItem {...item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    ))}
  </Container>
  );
}
