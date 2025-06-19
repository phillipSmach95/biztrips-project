import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import Spinner from "../spinner/Spinner";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const CARD_WIDTH = 300; // Fixed width for all cards

  const onDeleteIconClick = (id, category) => {
    deleteProduct(category, id).then(() => {
      setReload(true);
    });
  };

  useEffect(() => {
    setLoading(true);
    getProducts("trips").then((res) => {
      setTrips(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  function renderTrip(t) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={t.id} sx={{ display: "flex", justifyContent: "center" }}>
        <Card
          sx={{
            position: "relative",
            height: 350,
            width: CARD_WIDTH,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-8px) scale(1.03)",
              boxShadow: 6,
              cursor: "pointer",
            },
          }}
        >
          <IconButton
            aria-label="delete"
            onClick={() => onDeleteIconClick(t.id, "trips")}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 2, bgcolor: "rgba(255,0,0,0.1)" }}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <Link to={`/tripform/${t.id}`} style={{ textDecoration: "none", color: "inherit", flex: 1, display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="140"
              image={`images/items/${t.id}.jpg`}
              alt={t.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography gutterBottom variant="h5" component="div">
                {t.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t.startTrip[2]}-{t.startTrip[1]}-{t.startTrip[0]}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flexGrow: 1 }}>
                {t.description}
              </Typography>
            </CardContent>
          </Link>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2, color: "#cef" }}>
        Trips
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button
          component={Link}
          to="/newtripform"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mb: 2 }}
        >
          Add Trip
        </Button>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        <Grid container spacing={2} alignItems="stretch">
          {trips.map(renderTrip)}
        </Grid>
      )}
    </>
  );
}