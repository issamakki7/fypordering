import { Box, CardMedia, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import OrderImage from "../../assets/images/order.jpg";
import ReviewImage from "../../assets/images/review.jpg";

function OrderHome() {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate("/browseWithCart");
  };

  const handleReviewClick = () => {
    navigate("/review");
  };

  return (
    <Container sx={{ marginTop: "7rem", marginBottom: "3rem" }}>
      <Typography variant="h2" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        height="400px"
      >
        <Paper
          sx={{
            width: "40%",
            height: "100%",
            borderRadius: "0 0 50% 50% / 20% 20% 0 0",
            padding: "16px",
            margin: "3.5rem",
            cursor: "pointer",
            transition: "transform 0.3s ease-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
            // Media Query for tablet size
            "@media (max-width: 768px)": {
              width: "80%",
              margin: "2rem",
            },
            // Media Query for mobile size
            "@media (max-width: 480px)": {
              width: "100%",
              margin: "1rem",
            },
          }}
          onClick={handleOrderClick}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800 }}
            align="center"
            gutterBottom
          >
            Make An Order
          </Typography>
          <CardMedia
            sx={{
              width: "100%",
              height: "78%",
            }}
            component="img"
            image={OrderImage}
          />
        </Paper>

        <Paper
          sx={{
            width: "40%",
            height: "100%",
            borderRadius: "0 0 50% 50% / 20% 20% 0 0",
            padding: "16px",
            margin: "3.5rem",
            cursor: "pointer",
            backgroundColor: "#fafafa",
            transition: "transform 0.3s ease-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
            // Media Query for tablet size
            "@media (max-width: 768px)": {
              width: "80%",
              margin: "2rem",
            },
            // Media Query for mobile size
            "@media (max-width: 480px)": {
              width: "100%",
              margin: "1rem",
            },
          }}
          onClick={handleReviewClick}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800 }}
            align="center"
            gutterBottom
          >
            Leave a Review
          </Typography>
          <CardMedia
            sx={{
              width: "100%",
              height: "78%",
              backgroundColor: "#ffff",
            }}
            component="img"
            image={ReviewImage}
          />
        </Paper>
      </Box>
    </Container>
  );
}

export default OrderHome;
