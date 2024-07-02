import { useParams } from "react-router-dom";
import "./App"
 
import { useEffect, useState } from "react";
import { getProduct, getProducts } from "./services/productService";
export default function MeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const { meetingId } = useParams();
  function renderTrips(t) {
    return (
      <>
        <option key={t.id} value={t.id}>{t.title}</option>
      </>
    )
  }

  useEffect(() => {
    getProduct("meetings", meetingId).then((res) => {
      setTitle(res.title)
      setDescription(res.description)
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

              <label htmlFor="titel">Titel</label>
              <input type="text" name="titel" id="titel" onChange={(e)=>setTitle(e.target.value)} value={title} />
            </div>
            <div className="form-label-input">

              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" onChange={(e)=>setDescription(e.target.value)} value={description} />
            </div>
          </div>
          <button type="submit">Save</button>

        </form>
    
   </div>
    </>
  );
}
