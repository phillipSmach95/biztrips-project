import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, postProduct } from "../services/productService";
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
  Container,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
export default function NewMeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { meetingId } = useParams();

  const validateForm = () => {
    const newErrors = {}
    
    if (!tripId) newErrors.tripId = "Please select a trip"
    if (!title.trim()) newErrors.title = "Title is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!validateForm()) return
    
    const updatedFormData = {
      title,
      description,
      tripId,
    };
    
    setIsSubmitting(true)
    try {
      await postProduct("meetings", updatedFormData)
      navigate("/meetings")
    } catch (error) {
      setErrors({ submit: "Failed to create meeting. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    getProducts("trips")
      .then((res) => setTrips(res))
      .catch((error) => setErrors({ trips: "Failed to load trips" }))
      .finally(() => setIsLoading(false))
  }, [meetingId])
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Create New Meeting
      </Typography>
      
      {errors.submit && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.submit}
        </Alert>
      )}

      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardHeader 
          title="Meeting Details" 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'primary.contrastText',
            '& .MuiCardHeader-title': {
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }
          }} 
        />
        
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
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
                    id="tripId"
                    value={tripId}
                    label="Select Trip to add meeting"
                    onChange={(e) => setTripId(e.target.value)}
                    disabled={isLoading}
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
                {errors.trips && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.trips}
                  </Alert>
                )}
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
                    required
                    id="title"
                    name="title"
                    label="Meeting Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={!!errors.title}
                    helperText={errors.title}
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
              <Box sx={{ pt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting || isLoading}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  sx={{ 
                    minWidth: 200,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    display: 'block',
                    mx: 'auto'
                  }}
                >
                  {isSubmitting ? 'Creating Meeting...' : 'Create Meeting'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
