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

  return (
    <>
        <h1>Meetings</h1>
      <div className="card-wraper">
      <a className="card-hover" href={"/newmeetingform"}>
          <button className="btn-plus card">+ Add meeting</button>
        </a>
      {meetings.map((m)=>{
        return (
          <a key={m.id} className="card-hover" href={`/meetingform/${m.id}`}>
            <div className="card" >
              <div>
                <h2>{trips[m.tripId]?.title }</h2>
                <h4> {m.title}</h4>
                <p>{m.description}</p>
                <div>
                </div>
              </div>
            </div>
            </a>
        );
      })}
      </div>
    </>
  );
}
