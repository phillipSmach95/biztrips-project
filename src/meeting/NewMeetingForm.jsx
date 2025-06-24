import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, postProduct } from "../services/productService";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Divider
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export default function NewMeetingForm() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [trips, setTrips] = useState([]);
  const [tripId, setTripId] = useState("");
  const navigate = useNavigate();

  const { meetingId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = {
      title,
      description,
      tripId,
    };
    postProduct("meetings", updatedFormData);
    navigate("/meetings");
  };

  useEffect(() => {
    getProducts("trips").then((res) => setTrips(res));
  }, [meetingId]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/meetings")}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Back
          </Button>
          <MeetingRoomIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Add New Meeting
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Form */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Trip Selection */}
                <FormControl fullWidth required>
                  <InputLabel id="trip-select-label">Select Trip</InputLabel>
                  <Select
                    labelId="trip-select-label"
                    id="tripId"
                    value={tripId}
                    label="Select Trip"
                    onChange={(e) => setTripId(e.target.value)}
                  >
                    {trips.map((trip) => (
                      <MenuItem key={trip.id} value={trip.id}>
                        {trip.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Meeting Title */}
                <TextField
                  fullWidth
                  required
                  id="title"
                  label="Meeting Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  placeholder="Enter meeting title"
                />

                {/* Meeting Description */}
                <TextField
                  fullWidth
                  required
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  variant="outlined"
                  multiline
                  rows={4}
                  placeholder="Enter meeting description"
                />

                {/* Submit Button */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/meetings")}
                    sx={{ px: 4 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 'bold',
                    }}
                    disabled={!title || !description || !tripId}
                  >
                    Save Meeting
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
}
