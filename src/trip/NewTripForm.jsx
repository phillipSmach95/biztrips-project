import { useEffect, useState } from "react";
import { addTrip } from "../services/tripService";
import { getUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
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
    Paper
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";

export default function NewTripForm() {
    const [employees, setEmployees] = useState([])
    const [title, setTitle] = useState("")
    const [participants, setParticipants] = useState([])
    const [description, setDescription] = useState("")
    const [startTripDate, setStartTripDate] = useState("")
    const [startTripTime, setStartTripTime] = useState("")
    const [endTripDate, setEndTripDate] = useState("")
    const [endTripTime, setEndTripTime] = useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({})
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

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

        // imageUrl validation
        if (!imageUrl.trim()) {
            newErrors.imageUrl = "Image URL is required";
        } else {
            try {
                new URL(imageUrl);
            } catch {
                newErrors.imageUrl = "Please enter a valid URL (e.g. https://example.com/image.jpg)";
            }
        }
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const onSaveClick = async (event) => {
        event.preventDefault()
        
        if (!validateForm()) return
        
        const updatedFormData = {
            title,
            description,
            imageUrl,
            startDate: arraysToDate(startTripDate, startTripTime),
            endDate: arraysToDate(endTripDate, endTripTime),
            participants
        };
        
        setIsSubmitting(true)
        try {
            await addTrip(updatedFormData)
            navigate("/trips")
        } catch (error) {
            setErrors({ submit: "Failed to save trip. Please try again." })
        } finally {
            setIsSubmitting(false)
        }
    }

    const arraysToDate = (dateString, timeString) => {
        const [year, month, day] = dateString.split('-').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);
        const updatedDate = dayjs().set({
            year,
            month: month - 1,
            day,
            hour,
            minute
        }).toDate();
        return updatedDate;
    }

    const handleParticipantChange = (employeeId, isChecked) => {
        if (isChecked) {
            setParticipants([...participants, employeeId])
        } else {
            setParticipants(participants.filter((_id) => _id !== employeeId))
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getUsers()
            .then((res) => setEmployees(res))
            .catch((error) => {
                setErrors({ employees: "Failed to load employees" })
                console.error("Error loading employees:", error)
            })
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
                Create New Trip
            </Typography>
            
            {errors.submit && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {errors.submit}
                </Alert>
            )}

            <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardHeader 
                    title="Trip Details" 
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

                                    <TextField
                                        fullWidth
                                        label="Image URL"
                                        variant="outlined"
                                        value={imageUrl}
                                        onChange={e => setImageUrl(e.target.value)}
                                        error={!!errors.imageUrl}
                                        helperText={errors.imageUrl}
                                        required
                                        placeholder="https://example.com/image.jpg"
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
                                    
                                    {isLoading ? (
                                        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                                            <CircularProgress size={24} sx={{ mb: 1 }} />
                                            <Typography variant="body2" color="text.secondary">
                                                Loading employees...
                                            </Typography>
                                        </Paper>
                                    ) : errors.employees ? (
                                        <Alert severity="error">
                                            {errors.employees}
                                        </Alert>
                                    ) : (
                                        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                            <Box sx={{ maxHeight: 240, overflow: 'auto', p: 2 }}>
                                                <FormGroup>
                                                    {employees.map((employee) => (
                                                        <FormControlLabel
                                                            key={employee._id}
                                                            control={
                                                                <Checkbox
                                                                    checked={participants.includes(employee._id)}
                                                                    onChange={(e) => handleParticipantChange(employee._id, e.target.checked)}
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
                                    )}
                                    
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
                                    {isSubmitting ? 'Creating Trip...' : 'Create Trip'}
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}