import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteTrip, getTrip, updateTrip } from "../services/tripService";
import { getUsers } from "../services/userService";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    FormLabel,
    Grid,
    Stack,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    Paper,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { 
    Delete as DeleteIcon, 
    Save as SaveIcon,
    Edit as EditIcon
} from "@mui/icons-material";

export default function TripForm() {
    const [employees, setEmployees] = useState([])
    const [title, setTitle] = useState("")
    const [participants, setParticipants] = useState([])
    const [meetings, setMeetings] = useState([])
    const [description, setDescription] = useState("")
    const [startTripDate, setStartTripDate] = useState("")
    const [startTripTime, setStartTripTime] = useState("")
    const [endTripDate, setEndTripDate] = useState("")
    const [endTripTime, setEndTripTime] = useState("")
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const navigate = useNavigate()

    const onDeleteConfirm = async () => {
        try {
            await deleteTrip(tripId)
            navigate("/trips")
        } catch (error) {
            setErrors({ delete: "Failed to delete trip. Please try again." })
        }
        setDeleteDialogOpen(false)
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!title.trim()) newErrors.title = "Title is required"
        if (!description.trim()) newErrors.description = "Description is required"
        if (!startTripDate) newErrors.startTripDate = "Start date is required"
        if (!startTripTime) newErrors.startTripTime = "Start time is required"
        if (!endTripDate) newErrors.endTripDate = "End date is required"
        if (!endTripTime) newErrors.endTripTime = "End time is required"
        if (participants.length === 0) newErrors.participants = "At least one participant is required"
        
        if (startTripDate && endTripDate && startTripTime && endTripTime) {
            const startDateTime = new Date(`${startTripDate}T${startTripTime}`)
            const endDateTime = new Date(`${endTripDate}T${endTripTime}`)
            if (startDateTime >= endDateTime) {
                newErrors.endTrip = "End date and time must be after start date and time"
            }
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSaveClick = async (event) => {
        event.preventDefault();
        
        if (!validateForm()) return

        const updatedFormData = {
            title,
            meetings,
            description,
            startTrip: toIntArray(startTripDate, startTripTime),
            endTrip: toIntArray(endTripDate, endTripTime),
            participants
        };

        setIsSubmitting(true)
        try {
            await updateTrip(tripId, updatedFormData)
            navigate("/trips")
        } catch (error) {
            setErrors({ submit: "Failed to update trip. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    };
    
    const toStringDate = (date) => `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;
    const toStringTime = (date) => `${String(date[3]).padStart(2, '0')}:${String(date[4]).padStart(2, '0')}`;
    const toIntArray = (stringDate, stringTime) => {
        const [year, month, day] = stringDate.split('-').map((e) => Number(e));
        const [hour, minute] = stringTime.split(':').map((e) => Number(e));
        const updatedValues = [year, month, day, hour, minute];
        return updatedValues
    }

    const handleParticipantChange = (employeeId, isChecked) => {
        if (isChecked) {
            setParticipants([...participants, employeeId])
        } else {
            setParticipants(participants.filter((id) => id !== employeeId))
        }
    }

    const { tripId } = useParams()

    useEffect(() => {
        setIsLoading(true)
        
        Promise.all([
            getUsers(),
            getTrip(tripId)
        ])
        .then(([employeesRes, tripRes]) => {
            setEmployees(employeesRes)
            setDescription(tripRes.description)
            setTitle(tripRes.title)
            setStartTripDate(toStringDate(tripRes.startTrip))
            setStartTripTime(toStringTime(tripRes.startTrip))
            setEndTripDate(toStringDate(tripRes.endTrip))
            setEndTripTime(toStringTime(tripRes.endTrip))
            setParticipants(tripRes.participants || [])
            setMeetings(tripRes.meetings || [])
            setFormData({
                title: tripRes.title,
                description: tripRes.description,
                startTrip: tripRes.startTrip,
                endTrip: tripRes.endTrip,
                participants: tripRes.participants || [],
                meetings: tripRes.meetings || [],
            })
        })
        .catch((error) => {
            setErrors({ load: "Failed to load trip data. Please refresh the page." })
        })
        .finally(() => setIsLoading(false))
    }, [tripId])

    if (isLoading) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Paper elevation={3} sx={{ p: 6, borderRadius: 3, textAlign: 'center' }}>
                        <CircularProgress size={60} sx={{ mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            Loading trip data...
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            Please wait while we fetch the trip details
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Edit Trip
                </Typography>
                <IconButton
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                    sx={{ 
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'error.light',
                        color: 'error.contrastText',
                        '&:hover': {
                            bgcolor: 'error.main'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            
            {errors.load && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errors.load}
                </Alert>
            )}
            
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
                    title="Edit Trip Details" 
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
                            {/* Basic Information Section */}
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                                    Basic Information
                                </Typography>
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Trip Title"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        error={!!errors.title}
                                        helperText={errors.title}
                                        required
                                        placeholder="Enter a descriptive title for your trip"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                    
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        required
                                        placeholder="Provide a detailed description of the trip purpose and activities"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                    />
                                </Stack>
                            </Box>

                            <Divider />

                            {/* Schedule Section */}
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                                    Schedule
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                                                Start Time
                                            </Typography>
                                            <Stack spacing={2}>
                                                <TextField
                                                    fullWidth
                                                    label="Date"
                                                    type="date"
                                                    value={startTripDate}
                                                    onChange={(e) => setStartTripDate(e.target.value)}
                                                    error={!!errors.startTripDate}
                                                    helperText={errors.startTripDate}
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Time"
                                                    type="time"
                                                    value={startTripTime}
                                                    onChange={(e) => setStartTripTime(e.target.value)}
                                                    error={!!errors.startTripTime}
                                                    helperText={errors.startTripTime}
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                                            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium', color: 'error.main' }}>
                                                End Time
                                            </Typography>
                                            <Stack spacing={2}>
                                                <TextField
                                                    fullWidth
                                                    label="Date"
                                                    type="date"
                                                    value={endTripDate}
                                                    onChange={(e) => setEndTripDate(e.target.value)}
                                                    error={!!errors.endTripDate || !!errors.endTrip}
                                                    helperText={errors.endTripDate || errors.endTrip}
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Time"
                                                    type="time"
                                                    value={endTripTime}
                                                    onChange={(e) => setEndTripTime(e.target.value)}
                                                    error={!!errors.endTripTime || !!errors.endTrip}
                                                    helperText={errors.endTripTime}
                                                    required
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                                />
                                            </Stack>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider />

                            {/* Participants Section */}
                            <Box>
                                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                                    Participants
                                </Typography>
                                
                                <FormControl component="fieldset" error={!!errors.participants} fullWidth>
                                    <FormLabel component="legend" sx={{ mb: 2 }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                            Select trip participants *
                                        </Typography>
                                    </FormLabel>
                                    
                                    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                        <Box sx={{ maxHeight: 240, overflow: 'auto', p: 2 }}>
                                            <FormGroup>
                                                {employees.map((employee) => (
                                                    <FormControlLabel
                                                        key={employee.id}
                                                        control={
                                                            <Checkbox
                                                                checked={participants.includes(employee.id)}
                                                                onChange={(e) => handleParticipantChange(employee.id, e.target.checked)}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={`${employee.firstName} ${employee.lastName}`}
                                                        sx={{
                                                            py: 0.5,
                                                            '&:hover': {
                                                                bgcolor: 'action.hover',
                                                                borderRadius: 1,
                                                                mx: -1,
                                                                px: 1
                                                            }
                                                        }}
                                                    />
                                                ))}
                                            </FormGroup>
                                        </Box>
                                    </Paper>
                                    
                                    {errors.participants && (
                                        <FormHelperText sx={{ mt: 1 }}>{errors.participants}</FormHelperText>
                                    )}
                                </FormControl>
                            </Box>

                            <Divider />

                            {/* Submit Button */}
                            <Box sx={{ pt: 2 }}>
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
                                        display: 'block',
                                        mx: 'auto'
                                    }}
                                >
                                    {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                                </Button>
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
                        Delete Trip
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description" sx={{ pt: 1 }}>
                        Are you sure you want to delete this trip? This action cannot be undone and will permanently remove all trip data including associated meetings.
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
                        Delete Trip
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}