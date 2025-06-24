
import { NavLink } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Typography, 
  Box, 
  IconButton,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { 
  Business as BusinessIcon,
  Flight as FlightIcon,
  MeetingRoom as MeetingIcon,
  People as PeopleIcon,
  Add as AddIcon
} from "@mui/icons-material";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'Trips', path: '/trips', icon: <FlightIcon /> },
    { label: 'Meetings', path: '/meetings', icon: <MeetingIcon /> },
    { label: 'Employees', path: '/employees', icon: <PeopleIcon /> },
  ];

  const actionItems = [
    { label: 'New Trip', path: '/newtripform', icon: <AddIcon /> },
  ];

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            component={NavLink}
            to="/"
            sx={{ 
              p: 1, 
              mr: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
          >
            <img
              src="/images/logo.png"
              alt="BizTrips Logo"
              style={{ 
                height: "40px", 
                width: "auto",
                filter: 'brightness(1.2)'
              }}
            />
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              letterSpacing: '0.5px',
              display: { xs: 'none', sm: 'block' }
            }}
          >
            BizTrips
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Main Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: 'white',
                  mx: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-1px)',
                  },
                  '&.active': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fontWeight: 'bold',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {actionItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                variant="contained"
                startIcon={item.icon}
                sx={{
                  ml: 1,
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  boxShadow: '0 4px 12px rgba(65, 105, 225, 0.3)',
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(65, 105, 225, 0.4)',
                  },
                }}
              >
                {isMobile ? null : item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu (simplified for now) */}
          {isMobile && (
            <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
              {navItems.map((item) => (
                <IconButton
                  key={item.path}
                  component={NavLink}
                  to={item.path}
                  size="small"
                  sx={{
                    color: 'white',
                    mx: 0.5,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&.active': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
