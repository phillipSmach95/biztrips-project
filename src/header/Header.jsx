
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

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>        {/* Logo Section */}
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
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>          {/* Main Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
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

          {/* Mobile Menu (simplified for now) */}
          {isMobile && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
