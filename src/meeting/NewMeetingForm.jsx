import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";
import { addMeeting } from "../services/meetingService";
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
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
export default function NewMeetingForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tripId: ""
  })
  const [trips, setTrips] = useState([])
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const { meetingId } = useParams();

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.tripId) newErrors.tripId = "Please select a trip"
    if (!formData.title.trim()) newErrors.title = "Title is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!validateForm()) return
    
    const updatedFormData = {
      title: formData.title,
      description: formData.description,
      tripId: formData.tripId,
    };
    
    setIsSubmitting(true)
    try {
      await addMeeting(updatedFormData)
      navigate("/meetings")
    } catch (error) {
      setErrors({ submit: "Failed to create meeting. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    setIsLoading(true)
    getTrips()
      .then((res) => setTrips(res))
      .catch((error) => setErrors({ trips: "Failed to load trips" }))
      .finally(() => setIsLoading(false))
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
        <AddIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Create New Meeting
        </Typography>
      </Box>
      
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
                    value={formData.tripId}
                    label="Select Trip to add meeting"
                    onChange={handleChange('tripId')}
                    disabled={isLoading}
                  >
                    {trips.map((t) => (
                      <MenuItem key={t._d} value={t._id}>{t.title}</MenuItem>
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
                    value={formData.title}
                    onChange={handleChange('title')}
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
                    value={formData.description}
                    onChange={handleChange('description')}
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
              <Box sx={{ pt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/meetings")}
                  size="large"
                  sx={{ 
                    minWidth: 120,
                    py: 1.5,
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
                  disabled={isSubmitting || isLoading}
                  startIcon={isSubmitting ? <CircularProgress size={20} /> : <SaveIcon />}
                  sx={{ 
                    minWidth: 200,
                    py: 1.5,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                >
                  {isSubmitting ? 'Creating Meeting...' : 'Create Meeting'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
