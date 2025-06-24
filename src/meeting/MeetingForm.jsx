import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, getProducts, deleteProduct, patchProduct } from "../services/productService";
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
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

export default function MeetingForm() {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [trips, setTrips] = useState([]);
  const [tripId, setTripId] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { meetingId } = useParams();
  const navigate = useNavigate();

  const onDeleteConfirm = () => {
    deleteProduct("meetings", meetingId);
    navigate("/meetings");
    setDeleteDialogOpen(false);
  };

  const onSaveClick = (event) => {
    event.preventDefault();
    const updatedFormData = {
      title,
      description,
      tripId: tripId.toString()
    };
    patchProduct("meetings", meetingId, updatedFormData);
    navigate("/meetings");
  };

  useEffect(() => {
    getProduct("meetings", meetingId).then((res) => {
      setTitle(res.title);
      setDescription(res.description);
      setTripId(res.tripId);
    });
    getProducts("trips").then((res) => setTrips(res));
  }, [meetingId]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/meetings")}
              sx={{ mr: 2 }}
              variant="outlined"
            >
              Back
            </Button>
            <EditIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Edit Meeting
            </Typography>
          </Box>
          
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ 
              borderColor: 'error.main',
              '&:hover': {
                backgroundColor: 'error.main',
                color: 'white',
              }
            }}
          >
            Delete
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Form */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={onSaveClick}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Trip Selection */}
                <FormControl fullWidth required>
                  <InputLabel id="trip-select-label">Select Trip</InputLabel>
                  <Select
                    labelId="trip-select-label"
                    id="trip"
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
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: 'error.main' }}>
          Delete Meeting
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this meeting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button 
            onClick={onDeleteConfirm} 
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
