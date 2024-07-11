import { useNavigate, useParams } from "react-router-dom";
import "./App"

import { useEffect, useState } from "react";
import { getProducts, postProduct } from "./services/productService";
export default function NewMeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  const { meetingId } = useParams();
  const handleSubmit = (event) => {
    const updatedFormData = {
      title,
      description,
      tripId,
  };
    event.preventDefault()
    setFormData(updatedFormData)
    postProduct("meetings", updatedFormData)
    console.log(formData);
    navigate("/allmeetings")
  }
  useEffect(() => {

    getProducts("trips").then((res) => setTrips(res))
  }, [meetingId])
  return (
    <div className="content-wrapper">
      <h1>Add Meeting</h1>
      <div className="card">

        <form onSubmit={handleSubmit}>
          <div className="form-fields">

            <div className="form-label-input">

              <label htmlFor="">select Trip to add meeting</label>
              <select name="tripId" id="tripId" onChange={(e) => { setTripId(e.target.value);  }} value={tripId}>
                {trips.map((t) => {
                  return (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  )
                })}
              </select>
            </div>
            <div className="form-label-input">

              <label htmlFor="titel">Titel</label>
              <input type="text" name="titel" id="titel" onChange={(e) => { setTitle(e.target.value);  }} value={title} />
            </div>
            <div className="form-label-input">

              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" onChange={(e) => { setDescription(e.target.value);  }} value={description} />
            </div>
          </div>
          <button type="submit">Save</button>

        </form>

      </div>
    </div>
  );
}
