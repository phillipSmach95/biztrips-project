import { useEffect, useState } from "react";
import { deleteProduct, getProduct, patchProduct } from "../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Container,
  Paper,
  Divider,
  Avatar,
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

export default function EmployeeForm() {
  const [name, setName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '??';
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#1976d2', '#388e3c', '#f57c00', '#d32f2f', 
      '#7b1fa2', '#303f9f', '#0288d1', '#00796b'
    ];
    const index = name?.charCodeAt(0) % colors.length || 0;
    return colors[index];
  };

  const onDeleteConfirm = () => {
    deleteProduct("employees", employeeId);
    navigate("/employees");
    setDeleteDialogOpen(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = {
      name,
      emergencyContact,
    };
    patchProduct("employees", employeeId, updatedFormData);
    navigate("/employees");
  };

  useEffect(() => {
    getProduct("employees", employeeId).then((res) => {
      setName(res.name);
      setEmergencyContact(res.emergencyContact);
    });
  }, [employeeId]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/employees")}
              sx={{ mr: 2 }}
              variant="outlined"
            >
              Back
            </Button>
            <EditIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              Edit Employee
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
            <form onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Avatar Preview */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: getAvatarColor(name),
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {getInitials(name)}
                  </Avatar>
                </Box>

                {/* Employee Name */}
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Employee Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  placeholder="Enter employee full name"
                />

                {/* Emergency Contact */}
                <TextField
                  fullWidth
                  required
                  id="emergencyContact"
                  label="Emergency Contact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  variant="outlined"
                  placeholder="Enter emergency contact information"
                  type="tel"
                />

                {/* Submit Button */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/employees")}
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
                    disabled={!name || !emergencyContact}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Paper>

      {/* Delete Confirmation Dialog */}      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ color: 'error.main' }}>
          Delete Employee
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this employee? This action cannot be undone.
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