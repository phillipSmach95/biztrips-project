import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProduct, getProduct, getProducts, patchProduct } from "../services/productService";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import { 
    Delete as DeleteIcon, 
    Save as SaveIcon,
    Edit as EditIcon,
    ArrowBack as ArrowBackIcon} from "@mui/icons-material";

export default function TripForm() {
    const [employees, setEmployees] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        startTripDate: "",
        startTripTime: "",
        endTripDate: "",
        endTripTime: "",
        participants: [],
        meetings: []
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const navigate = useNavigate()

    const onDeleteConfirm = async () => {
        try {
            await deleteProduct("trips", tripId)
            navigate("/trips")
        } catch (error) {
            setErrors({ delete: "Failed to delete trip. Please try again." })
        }
        setDeleteDialogOpen(false)
    }

    const validateForm = () => {
        const newErrors = {}
        
        if (!formData.title.trim()) newErrors.title = "Title is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.startTripDate) newErrors.startTripDate = "Start date is required"
        if (!formData.startTripTime) newErrors.startTripTime = "Start time is required"
        if (!formData.endTripDate) newErrors.endTripDate = "End date is required"
        if (!formData.endTripTime) newErrors.endTripTime = "End time is required"
        if (formData.participants.length === 0) newErrors.participants = "At least one participant is required"
        
        if (formData.startTripDate && formData.endTripDate && formData.startTripTime && formData.endTripTime) {
            const startDateTime = new Date(`${formData.startTripDate}T${formData.startTripTime}`)
            const endDateTime = new Date(`${formData.endTripDate}T${formData.endTripTime}`)
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
            title: formData.title,
            meetings: formData.meetings,
            description: formData.description,
            startTrip: toIntArray(formData.startTripDate, formData.startTripTime),
            endTrip: toIntArray(formData.endTripDate, formData.endTripTime),
            participants: formData.participants
        };

        setIsSubmitting(true)
        try {
            await patchProduct("trips", tripId, updatedFormData)
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
            setFormData(prev => ({
                ...prev,
                participants: [...prev.participants, employeeId]
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                participants: prev.participants.filter((id) => id !== employeeId)
            }))
        }
    }

    const { tripId } = useParams()

    useEffect(() => {
        setIsLoading(true)
        
        Promise.all([
            getProducts("employees"),
            getProduct("trips", tripId)
        ])
        .then(([employeesRes, tripRes]) => {
            setEmployees(employeesRes)
            setFormData({
                title: tripRes.title,
                description: tripRes.description,
                startTripDate: toStringDate(tripRes.startTrip),
                startTripTime: toStringTime(tripRes.startTrip),
                endTripDate: toStringDate(tripRes.endTrip),
                endTripTime: toStringTime(tripRes.endTrip),
                participants: tripRes.participants || [],
                meetings: tripRes.meetings || []
            })
        })
        .catch((error) => {
            setErrors({ load: "Failed to load trip data. Please refresh the page." })
        })
        .finally(() => setIsLoading(false))
    }, [tripId])

    if (isLoading) {
        return (
            <Box sx={{ py: 4 }}>
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
            </Box>
        )
    }

    return (
        <Box sx={{ py: 4 }}>
            <Box display="flex" alignItems="center" mb={4}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/trips")}
                    sx={{ mr: 2 }}
                    variant="outlined"
                >
                    Back
                </Button>
                <EditIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Edit Trip
                </Typography>
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
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
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
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
                                                    value={formData.startTripDate}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, startTripDate: e.target.value }))}
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
                                                    value={formData.startTripTime}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, startTripTime: e.target.value }))}
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
                                                    value={formData.endTripDate}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, endTripDate: e.target.value }))}
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
                                                    value={formData.endTripTime}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, endTripTime: e.target.value }))}
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
                                                                checked={formData.participants.includes(employee.id)}
                                                                onChange={(e) => handleParticipantChange(employee.id, e.target.checked)}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={employee.name}
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
                                    Delete Trip
                                </Button>
                                
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate("/trips")}
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
        </Box>
    );
}