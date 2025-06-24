import Header from "../header/Header";
import { Route, Routes } from "react-router-dom";
import Empoyees from "../employee/Employees";
import Meetings from "../meeting/Meetings";
import Trips from "../trip/Trips";
import TripForm from "../trip/TripForm";
import MeetingForm from "../meeting/MeetingForm";
import EmployeeForm from "../employee/EmployeeForm";
import NewTripForm from "../trip/NewTripForm";
import NewMeetingForm from "../meeting/NewMeetingForm";
import NewEmployeeForm from "../employee/NewEmployeeForm";
import NotFound from "../components/NotFound";
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#191970", // midnight blue
      light: "#4a4a9f",
      dark: "#0f0f4a",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4169e1", // royal blue
      light: "#6a7ffa",
      dark: "#2e47a8",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0a0a1a", // very dark blue
      paper: "#1a1a2e", // dark blue-gray
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0c4de", // light steel blue
    },
    divider: "#2a2a4a",
    error: {
      main: "#ff4444",
    },
    warning: {
      main: "#ffaa00",
    },
    info: {
      main: "#00aaff",
    },
    success: {
      main: "#00aa44",
    },
  },
  typography: {
    fontFamily: "'Open Sans', Arial, sans-serif",
    h1: {
      fontWeight: 700,
      color: "#ffffff",
    },
    h2: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h3: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h4: {
      fontWeight: 600,
      color: "#ffffff",
    },
    h5: {
      fontWeight: 500,
      color: "#ffffff",
    },
    h6: {
      fontWeight: 500,
      color: "#b0c4de",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #191970 0%, #4169e1 50%, #191970 100%)",
          boxShadow: "0 4px 20px rgba(25, 25, 112, 0.3)",
          borderBottom: "1px solid rgba(65, 105, 225, 0.2)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          background: " #191970",
          color: "#ffffff",
          "&:hover": {
            background: " #4169e1",
            boxShadow: "0 4px 16px rgba(65, 105, 225, 0.4)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          background: "transparent",
          border: "2px solid #4169e1",
          color: "#4169e1",
          "&:hover": {
            background: "rgba(65, 105, 225, 0.1)",
            border: "2px solid #6a7ffa",
            color: "#6a7ffa",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
          boxShadow: "0 8px 32px rgba(25, 25, 112, 0.2)",
          border: "1px solid rgba(65, 105, 225, 0.1)",
          "&:hover": {
            boxShadow: "0 12px 40px rgba(65, 105, 225, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: "linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)",
          border: "1px solid rgba(65, 105, 225, 0.1)",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, rgba(26, 26, 46, 0.6) 0%, rgba(16, 33, 62, 0.6) 100%)",
          backdropFilter: "blur(10px)",
          borderRadius: 16,
          border: "1px solid rgba(65, 105, 225, 0.1)",
          padding: "2rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "rgba(26, 26, 46, 0.5)",
            "& fieldset": {
              borderColor: "rgba(65, 105, 225, 0.3)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(65, 105, 225, 0.5)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4169e1",
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "rgba(65, 105, 225, 0.2)",
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Header />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Trips />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/tripform/:tripId" element={<TripForm />} />
            <Route path="/newtripform" element={<NewTripForm />} />
            <Route path="/employees" element={<Empoyees />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/newmeetingform" element={<NewMeetingForm />} />
            <Route path="/meetingform/:meetingId" element={<MeetingForm />} />
            <Route path="/employeeform/:employeeId" element={<EmployeeForm />} />
            <Route path="/newemployeeform" element={<NewEmployeeForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  );
}
