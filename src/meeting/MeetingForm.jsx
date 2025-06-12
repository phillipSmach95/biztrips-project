import { useParams, useNavigate } from "react-router-dom";
import "../app/App"

import { useEffect, useState } from "react";
import { getProduct, getProducts, deleteProduct, patchProduct} from "../services/productService";
export default function MeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const [formData, setFormData] = useState({})
  const { meetingId } = useParams();
  const navigate = useNavigate()

  const onDeleteConfirm = (event)=>{
    event.preventDefault()
    if(window.confirm("are you sure you want to delete the employee")){
      deleteProduct("meetings",meetingId)
      navigate("/meetings")
    }
  }
  const onSaveClick = (event) => {
    const updatedFormData = {
      title,
      description,
      tripId
    };
    event.preventDefault()
    setFormData(updatedFormData);
    patchProduct("meetings", meetingId, updatedFormData)
    navigate("/meetings")
  }
  useEffect(() => {
    getProduct("meetings", meetingId).then((res) => {
      setTitle(res.title)
      setDescription(res.description)
      setTripId(res.tripId+1)
    })
    getProducts("trips").then((res) => setTrips(res))
  }, [meetingId])
  return (
    <div className="content-wrapper">
      <h1>Edit Meeting</h1>
      <div className="card">
      <button className="delete-btn" onClick={onDeleteConfirm}><img className="icon" src={"../images/delete-icon.png"} alt="delete" /></button>
        <form >
          <div className="form-fields">

            <div className="form-label-input">

              <label htmlFor="trip">select Trip to add meeting</label>
              <select name="trip" id="trip" onChange={(e) => setTripId(e.target.value)} value={tripId}>
                {trips.map((t) => {
                  return (<option onSelect={()=>setTripId(t.id)} key={t.id} value={t.id}>{t.title}</option>)
                })}
              </select>
            </div>
            <div className="form-label-input">

              <label htmlFor="titel">Titel</label>
              <input type="text" name="titel" id="titel" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div className="form-label-input">

              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" onChange={(e) => setDescription(e.target.value)} value={description} />
            </div>
          </div>
          <button onClick={onSaveClick}>Save</button>

        </form>

      </div>
    </div>
  );
}
