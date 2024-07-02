import { useParams } from "react-router-dom";
import "./App"
 
import { useEffect, useState } from "react";
import { getProduct, getProducts } from "./services/productService";
export default function MeetingForm() {
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const { meetingId } = useParams();
  function renderTrips(t, i) {
    return (
      <>
        <option key={i} value={t.id}>{t.title}</option>
      </>
    )
  }

  useEffect(() => {
    getProduct("meetings", meetingId).then((res) => {
      setTitle(res.title)
    })
    getProducts("trips").then((res) => setTrips(res))
  }, [meetingId])
  return (
    <>
      <h1>Meeting Data</h1>
   <div className="card">

        <form >
          <div className="form-fields">

            <div className="form-label-input">

              <label htmlFor="">select Trip to add meeting</label>
              <select name="" id="" onChange={(e) => setTripId(e.target.value)} value={tripId}>
                {trips.map(renderTrips)}
              </select>
            </div>
            <div className="form-label-input">

              <label htmlFor="">name</label>
              <input type="text" name="" id="" value={title} />
            </div>
            <div className="form-label-input">

              <label htmlFor="">description</label>
              <input type="text" name="" id="" />
            </div>
            <div className="form-label-input">
              <label htmlFor=""> Paricipants</label>
              <input type="text" name="" id="" />

            </div>
          </div>
          <button type="submit">Save</button>

        </form>
    
   </div>
    </>
  );
}
