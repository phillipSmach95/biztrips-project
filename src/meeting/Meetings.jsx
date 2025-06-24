import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import { deleteProduct, getProducts } from "../services/productService";
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  Box, 
  IconButton, 
  Chip,
  Paper,
  Fab
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import BusinessIcon from "@mui/icons-material/Business";
import { Link } from "react-router-dom";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDeleteIconClick = (id, category) => {
    deleteProduct(category, id).then(() => setReload(true));
  };

  useEffect(() => {
    setLoading(true);
    getProducts("trips").then((res) => {
      setTrips(res);
    });
    getProducts("meetings").then((res) => {
      setMeetings(res);
      setLoading(false);
      setReload(false);
    });
  }, [reload]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <MeetingRoomIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          Meetings
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Spinner />
        </Box>
      )}

      <Grid container spacing={3}>
        {/* Add New Meeting Card */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card
            component={Link}
            to="/newmeetingform"
            sx={{
              height: 280,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
              border: '2px dashed',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(65, 105, 225, 0.05)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
                Add New Meeting
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Meeting Cards */}
        {meetings.map((meeting) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={meeting.id}>
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
                  onDeleteIconClick(meeting.id, "meetings");
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
                to={`/meetingform/${meeting.id}`}
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  p: 3,
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<BusinessIcon />}
                    label={trips[meeting.tripId]?.title || 'Unknown Trip'}
                    color="primary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>

                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {meeting.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {meeting.description}
                </Typography>

                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="caption" color="text.secondary">
                    Click to view details
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add meeting"
        component={Link}
        to="/newmeetingform"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
