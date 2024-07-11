import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Empoyees from "./Employees";
import Meetings from "./Meetings";
import Trips from "./Trips";
import TripForm from "./TripForm";
import MeetingForm from "./MeetingForm";
import EmployeeForm from "./EmployeeForm";
import NewTripForm from "./NewTripForm";
import NewMeetingForm from "./NewMeetingForm";
import NewEmployeeForm from "./NewEmployeeForm";

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

  return (
    <>
<div className="page-wrapper">

      <Header />

      <section className="content-wrapper">
        <div className="content">
          <Routes>
            <Route path="/" element={<Trips />} />
            <Route path="/alltrips" element={<Trips />} />
            <Route path="/tripform/:tripId" element={<TripForm />} />
            <Route path="/newtripform" element={<NewTripForm />} />
            <Route path="/allemployees" element={<Empoyees />} />
            <Route path="/allmeetings" element={<Meetings />} />

            <Route path="/newmeetingform" element={<NewMeetingForm />} />
            <Route path="/meetingform/:meetingId" element={<MeetingForm />} />
            <Route path="/employeeform/:employeeId" element={<EmployeeForm />} />
            <Route path="/newemployeeform" element={<NewEmployeeForm />} />
          </Routes>
        </div>
      </section>

      <Footer />
</div>
    </>
  );
}
