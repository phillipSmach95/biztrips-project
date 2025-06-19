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
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// const trips = [
//   {
//     id: 1,
//     title: "BT01",
//     description: "San Francisco World Trade Center on new Server/IOT/Client ",
//     startTrip: [2021, 2, 13, 0, 0],
//     endTrip: [2021, 2, 15, 16, 56],
//     meetings: [
//       {
//         id: 1,
//         title: "One Conference",
//         description: "Key Note on One Conference",
//       },
//       {
//         id: 2,
//         title: "Zero Conference",
//         description: "Workshop Zero on One Conference",
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "BT02",
//     description: "Santa Clara Halley on new Server/IOT/Client",
//     startTrip: [2021, 6, 23, 9, 0],
//     endTrip: [2021, 6, 27, 16, 56],
//     meetings: [
//       {
//         id: 3,
//         title: "One Conference",
//         description: "HandsOn on One Conference",
//       },
//       {
//         id: 4,
//         title: "One Conference",
//         description: "Key Note on One Conference",
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "BT03",
//     description: "San Cose City Halley on Docker/IOT/Client",
//     startTrip: [2021, 12, 13, 9, 0],
//     endTrip: [2021, 12, 15, 16, 56],
//     meetings: [
//       {
//         id: 5,
//         title: "One Conference",
//         description: "Key Note on One Conference",
//       },
//     ],
//   },
// ];

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
   



    </ThemeProvider>
    </>
  );
}
