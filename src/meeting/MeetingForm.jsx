import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, getProducts, deleteProduct, patchProduct} from "../services/productService";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Save as SaveIcon, Edit as EditIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
export default function MeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { meetingId } = useParams();
  const navigate = useNavigate()

  const onDeleteConfirm = async () => {
    try {
      await deleteProduct("meetings", meetingId)
      navigate("/meetings")
    } catch (error) {
      setErrors({ delete: "Failed to delete meeting. Please try again." })
    }
    setDeleteDialogOpen(false)
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!tripId) newErrors.tripId = "Please select a trip"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSaveClick = async (event) => {
    event.preventDefault()
    
    if (!validateForm()) return
    
    const updatedFormData = {
      title,
      description,
      tripId
    };
    
    setIsSubmitting(true)
    try {
      await patchProduct("meetings", meetingId, updatedFormData)
      navigate("/meetings")
    } catch (error) {
      setErrors({ submit: "Failed to update meeting. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    getProduct("meetings", meetingId).then((res) => {
      setTitle(res.title || "")
      setDescription(res.description || "")
      setTripId(res.tripId || "")
    })
    getProducts("trips").then((res) => setTrips(res))
  }, [meetingId])
  return (
    <Box sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
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
      
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.submit}
        </Alert>
      )}

      {errors.delete && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.delete}
        </Alert>
      )}

      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardHeader 
          avatar={<EditIcon />}
          title="Edit Meeting Details" 
          sx={{ 
            bgcolor: 'secondary.main', 
            color: 'secondary.contrastText',
            '& .MuiCardHeader-title': {
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }
          }} 
        />
        
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={onSaveClick}>
            <Stack spacing={4}>
              {/* Trip Selection Section */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                  Trip Association
                </Typography>
                <FormControl fullWidth required error={!!errors.tripId}>
                  <InputLabel id="trip-select-label">Select Trip to add meeting</InputLabel>
                  <Select
                    labelId="trip-select-label"
                    id="trip"
                    value={tripId}
                    label="Select Trip to add meeting"
                    onChange={(e) => setTripId(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  >
                    {trips.map((t) => (
                      <MenuItem key={t.id} value={t.id}>{t.title}</MenuItem>
                    ))}
                  </Select>
                  {errors.tripId && (
                    <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                      {errors.tripId}
                    </Typography>
                  )}
                </FormControl>
              </Box>

              <Divider />

              {/* Basic Information Section */}
              <Box>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                  Meeting Information
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Meeting Title (Optional)"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                    placeholder="Enter a descriptive title for the meeting"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                  
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={3}
                    placeholder="Provide additional details about the meeting agenda or purpose"
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Stack>
              </Box>

              <Divider />

              {/* Submit Button */}
              <Box sx={{ pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                  startIcon={<DeleteIcon />}
                  size="large"
                  sx={{ 
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderColor: 'error.main',
                    '&:hover': {
                      backgroundColor: 'error.main',
                      color: 'white',
                    }
                  }}
                >
                  Delete Meeting
                </Button>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/meetings")}
                    size="large"
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                    sx={{ 
                      minWidth: 200,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </Box>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle id="delete-dialog-title" sx={{ pb: 1 }}>
          <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon color="error" />
            Delete Meeting
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description" sx={{ pt: 1 }}>
            Are you sure you want to delete this meeting? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={() => setDeleteDialogOpen(false)} 
            color="primary"
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={onDeleteConfirm} 
            color="error" 
            variant="contained"
            sx={{ borderRadius: 2 }}
            startIcon={<DeleteIcon />}
          >
            Delete Meeting
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
