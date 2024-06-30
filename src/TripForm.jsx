import "./TripForm.css";
import "./App.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, getProducts } from "./services/productService";

export default function TripForm() {

  const [employees, setEmployees] = useState([])
  const [title, setTitle] = useState("")
  const [paticipants, setPaticipants] = useState([])
  const [meetings, setMeetings] = useState([])
  const [description, setDescription] = useState("")
  const [startTripDate, setStartTripDate] = useState("")
  const [startTripTime, setStartTripTime] = useState("")
  const [endTripDate, setEndTripDate] = useState("")
  const [endTripTime, setEndTripTime] = useState("")
  const toStringDate = (date) => `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;
  const toStringTime = (date) => `${String(date[3]).padStart(2, '0')}:${String(date[4]).padStart(2, '0')}`;
  const toIntArray = (stringDate, stringTime) => {
    const [year, month, day] = stringDate.split('-').map(Number);
    const [hour, minute] = stringTime.split(':').map(Number);
    const updatedValues = [year, month, day, hour, minute];
    return updatedValues
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {
      title: title,
      description: description,
      startTrip: toIntArray(startTripDate, startTripTime),
      endTrip: toIntArray(endTripDate, endTripTime),
      paticipants: paticipants,
      meetings: meetings,
    }
    console.log(body);
  }

  function showEmployees(e) {
    let value = false;
    if (paticipants.includes(e.id))
      value = true;
     const handleChange =(isParticipant)=>{
      if (isParticipant){
        setPaticipants([...paticipants, e.id])
        console.log(paticipants);
      }else{
        setPaticipants(paticipants.filter((v)=>v !== e.id))
        console.log(paticipants);
      }
     }
    return (
      <>
        <label key={e.id} htmlFor={`employee${e.id}`}>
          <input type="checkbox" name={`employee${e.id}`} id={`employee${e.id}`} onChange={(e)=>{handleChange(e.target.checked)}} checked={value}/>
          {e.name}
        </label>
      </>
    )
  }

  const { tripId } = useParams()
  useEffect(() => {
    getProducts("employees").then((res) => {
      setEmployees(res)
    })

    getProduct("trips", tripId).then((res) => {
      setDescription(res.description)
      setTitle(res.title)
      setStartTripDate(toStringDate(res.startTrip))
      setStartTripTime(toStringTime(res.startTrip))
      setEndTripDate(toStringDate(res.endTrip))
      setEndTripTime(toStringTime(res.endTrip))
      setPaticipants(res.paticipants)
      setMeetings(res.meetings)
    });
  }, [tripId])

  return (
    <>
      <div className="content">
        <h1>Trip Modus </h1>

        <form onSubmit={handleSubmit} >
          <div>

            <label htmlFor="title">Title </label>
            <input type="text" name="title" id="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
            <label htmlFor="description">Description</label>
            <textarea rows={3} name="description" id="description" onChange={(e) => { setDescription(e.target.value) }} value={description} />
            <label htmlFor="startTrip" >Start of Trip</label>
            <div className="date-and-time">
              <input type="date" name="startTrip" id="startTrip" onChange={(e) => { setStartTripDate(e.target.value); console.log(startTripDate); }} value={startTripDate} />
              <input type="time" name="startTrip" id="startTrip" onChange={(e) => { setStartTripTime(e.target.value); console.log(startTripTime); }} value={startTripTime} />
            </div>

            <label htmlFor="endTrip">End of trip</label>
            <div className="date-and-time">
              <input type="date" name="endTrip" id="endTrip" onChange={(e) => { setEndTripDate(e.target.value) }} value={endTripDate} />
              <input type="time" name="endTrip" id="endTrip" onChange={(e) => { setEndTripTime(e.target.value) }} value={endTripTime} />
            </div>
          </div>

          <div className="checkbox-div">
            {employees.map((e)=> showEmployees(e))}
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
}
