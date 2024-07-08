import { useParams, useNavigate } from "react-router-dom";
import "./App"

import { useEffect, useState } from "react";
import { getProduct, getProducts, deleteProduct, patchProduct} from "./services/productService";
export default function MeetingForm() {
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const [trips, setTrips] = useState([])
  const [tripId, setTripId] = useState("")
  const [formData, setFormData] = useState({})
  const { meetingId } = useParams();
  const navigate = useNavigate()

  const updateFormdata = () => {
    setFormData({
      title: title,
      description: description,
      tripId: tripId,
    });
  };
  const onDeleteConfirm = (event)=>{
    event.preventDefault()
    if(window.confirm("are you sure you want to delete the employee")){
      deleteProduct("meetings",meetingId)
      navigate("/meetings")
    }
  }
  const onSaveClick = (event) => {
    event.preventDefault()
    updateFormdata()
    patchProduct("meetings", meetingId, formData)
    navigate("/meetings")
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

              <label htmlFor="trip">select Trip to add meeting</label>
              <select name="trip" id="trip" onChange={(e) => setTripId(e.target.value)} value={tripId}>
                {trips.map((t) => {
                  return (<option key={t.id} value={t.id}>{t.title}</option>)
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
          <button onClick={onDeleteConfirm}>Delete</button>
          <button onClick={onSaveClick}>Save</button>

        </form>

      </div>
    </>
  );
}
