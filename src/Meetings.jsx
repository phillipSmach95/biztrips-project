import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./services/productService";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    getProducts("meetings").then((res) => {
      setMeetings(res);
      getProducts("trips").then((res) => {setTrips(res)})
    });
  }, []);

  function renderMeetings(m, i) {
    const trip = trips[m.tripId]?.title
    return (
      <>
        <div className="card" key={i}>
          <div>
            <h2>{trip}</h2>
            <h4> {m.title}</h4>
            <p>{m.description}</p>
            <div>
              <Link to={`/meetingform/${m.id}`}>edit meeting</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <section id="filters">
        <label htmlFor="month">Filter by Month:</label>{" "}
        <select id="size">
          <option value="">All months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
        </select>
      </section>
        <h1>Meetings</h1>
      <div className="card-wraper">
      {meetings.map(renderMeetings)}
      </div>
    </>
  );
}
