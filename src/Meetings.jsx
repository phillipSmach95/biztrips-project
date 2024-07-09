import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "./services/productService";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [trips, setTrips] = useState([]);
  const [reload, setReload] = useState(false);
  const onDeleteIconClick = (id, category)=>{
    deleteProduct(category,id)
    setReload(true)
}
  useEffect(() => {
    getProducts("meetings").then((res) => {
      setMeetings(res);
      getProducts("trips").then((res) => {setTrips(res)})
    });
  }, [reload]);

  return (
    <>
        <h1>Meetings</h1>
      <div className="card-wraper">
      <a className="card-hover" href={"/newmeetingform"}>
          <button className="btn-plus card">+ Add meeting</button>
        </a>
      {meetings.map((m)=>{
        return (
          <div className="card-hover" key={m.id}>
          <button onClick={()=>onDeleteIconClick(m.id,"meetings")} className="delete-btn"><img className="icon" src={"images/delete-icon.png"} alt="delete" /></button>
              
          <a href={`/meetingform/${m.id}`}>
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
            </div>
        );
      })}
      </div>
    </>
  );
}
