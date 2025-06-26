import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "../services/productService";
import Spinner from "../spinner/Spinner";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PeopleIcon from "@mui/icons-material/People";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeleteIconClick = (id, category) => {
    deleteProduct(category, id).then(() => setReload(true));
  };

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

  useEffect(() => {
    setLoading(true);
    getProducts("employees").then((res) => {
      setEmployees(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  return (
    <Box sx={{ p: 3 }}>      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
            Employees
          </Typography>
        </Box>
        <Button
          component={Link}
          to="/newemployeeform"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          Add Employee
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Spinner />
        </Box>
      )}      <Grid container spacing={3}>
        {/* Employee Cards */}
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={employee.id}>
            <Card
              sx={{
                height: 280,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 8,
                },
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDeleteIconClick(employee.id, "employees");
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  backgroundColor: 'rgba(255, 68, 68, 0.1)',
                  color: 'error.main',
                  '&:hover': {
                    backgroundColor: 'error.main',
                    color: 'white',
                  },
                }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>

              <CardContent
                component={Link}
                to={`/employeeform/${employee.id}`}
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  p: 3,
                  textAlign: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    backgroundColor: getAvatarColor(employee.name),
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                  }}
                >
                  {getInitials(employee.name)}
                </Avatar>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {employee.name}
                </Typography>

                {employee.emergencyContact && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {employee.emergencyContact}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid', borderColor: 'divider', width: '100%' }}>
                  <Typography variant="caption" color="text.secondary">
                    Click to view details
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>        ))}
      </Grid>
    </Box>
  );
}