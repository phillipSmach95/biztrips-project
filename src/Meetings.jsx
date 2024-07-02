import { useEffect, useState } from "react";
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

  function renderMeetings(m) {
    
    const trip = trips[m.tripId-1]?.title
    return (
      <>
      <a className="card-hover" href={`/meetingform/${m.id}`}>
        <div className="card" key={m.id}>
          <div>
            <h2>{trip }</h2>
            <h4> {m.title}</h4>
            <p>{m.description}</p>
            <div>
            </div>
          </div>
        </div>
        </a>
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
