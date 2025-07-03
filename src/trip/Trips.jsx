import { useEffect, useState } from "react";
import { deleteTrip, getTrips } from "../services/tripService";
import Spinner from "../spinner/Spinner";
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import FlightIcon from "@mui/icons-material/Flight";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const CARD_WIDTH = 300; // Fixed width for all cards

  const onDeleteIconClick = (id) => {
    deleteTrip(id).then(() => {
      setReload(true); // Use reload state to trigger useEffect and reload trips
    });
  };

  useEffect(() => {
    setLoading(true);
    getTrips().then((res) => {
      setTrips(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  function renderTrip(t) {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} key={t._id} sx={{ display: "flex", justifyContent: "center" }}>
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
            onClick={() => onDeleteIconClick(t._id)}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 2, bgcolor: "rgba(255,0,0,0.1)" }}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <Link to={`/tripform/${t._id}`} style={{ textDecoration: "none", color: "inherit", flex: 1, display: "flex", flexDirection: "column" }}>
            <CardMedia
              component="img"
              height="140"
              image={t.imageUrl ? t.imageUrl : `images/items/${t._id}.jpg`}
              alt={t.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography gutterBottom variant="h5" component="div">
                {t.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dayjs(t.startTrip || t.startDate).format("DD-MM-YYYY")}
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
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FlightIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            Trips
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/newtripform"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          Add Trip
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Spinner />
        </Box>
      )}

      <Grid container spacing={3}>
        {trips.map(renderTrip)}
      </Grid>
    </Box>
  );
}