import { useState } from "react";
import { postProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
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
  Avatar
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function NewEmployeeForm() {
  const [name, setName] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedFormData = {
      name,
      emergencyContact,
    };
    postProduct("employees", updatedFormData);
    navigate("/employees");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/employees")}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Back
          </Button>
          <PersonAddIcon sx={{ fontSize: 32, mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Add New Employee
          </Typography>
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
                      backgroundColor: 'primary.main',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {name
                      ?.split(' ')
                      .map(word => word[0])
                      .join('')
                      .toUpperCase()
                      .slice(0, 2) || '??'}
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
                    Save Employee
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
