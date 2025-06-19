

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
import { ThemeProvider, createTheme, CssBaseline, Container } from "@mui/material";



export default function App() {
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
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
          </Routes>
   </Container>

    </ThemeProvider>
    </>
  );
}
