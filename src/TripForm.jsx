 
import "./App.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct, getProducts, patchProduct } from "./services/productService";

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
  const [isUpdate, setIsUpdate] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [isCreate, setIsCreate] = useState(false)
  const [formData, setFormData] = useState({})
  const onSaveClick = (event) => {
    console.log(isUpdate);
    setIsUpdate(true)
    console.log(isUpdate);
    event.preventDefault()
    setFormData({
      title:title,
      meetings:meetings,
      description:description,
      startTrip:toIntArray(startTripDate,startTripTime),
      endTrip:toIntArray(endTripDate,endTripTime),
      paticipants:paticipants
    })
    console.log(formData);
  }

  const resetFetchtype = () => {
    setIsCreate(false)
    setIsUpdate(false)
    setIsDelete(false)
  }

  const toStringDate = (date) => `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;
  const toStringTime = (date) => `${String(date[3]).padStart(2, '0')}:${String(date[4]).padStart(2, '0')}`;
  const toIntArray = (stringDate, stringTime) => {
    const [year, month, day] = stringDate.split('-').map((e) => Number(e));
    const [hour, minute] = stringTime.split(':').map((e) => Number(e));
    const updatedValues = [year, month, day, hour, minute];
    return updatedValues
  }
  const handleSubmit = (event) => {
    event.preventDefault()
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

  function showEmployees(employee, index) {
    let value = false;
    if (paticipants.includes(employee.id))
      value = true;
    const handleChange = (isParticipant) => {
      if (isParticipant) {
        setPaticipants([...paticipants, employee.id])
      } else {
        setPaticipants(paticipants.filter((value) => value !== employee.id))
      }
      console.log(paticipants);
    }
    return (
      <>
        <label key={index} htmlFor={`employee${employee.id}`}>
          <input type="checkbox" name={`employee${employee.id}`} id={`employee${employee.id}`}value={employee.id} onChange={(e) => { handleChange(e.target.checked) }} checked={value} />
          {employee.name}
        </label>
      </>
    )
  }

  const { tripId } = useParams()
  useEffect(() => {
    console.log(isUpdate);
    patchProduct("trips",tripId,formData).then((res)=>{ console.log(res);})
    console.log(formData);
  }, [formData])

  useEffect(() => {
      console.log("error");
      
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
  }, [])

  return (
    <>
      <h1>Trip Modus </h1>
      <div className=" card">

        <form  >

          <div className="form-fields">
            <div className="grid-2 ">

              <div>

                <div className="form-label-input">
                  <label htmlFor="title">Title </label>
                  <input type="text" name="title" id="title" onChange={(e) => { setTitle(e.target.value) }} value={title} />
                </div>





                <div className="form-label-input">

                  <label htmlFor="description">Description</label>
                  <textarea rows={3} name="description" id="description" onChange={(e) => { setDescription(e.target.value) }} value={description} />
                </div>





                <div className="form-label-input">
                  <label htmlFor="startTrip" >Start of Trip</label>
                  <div className="date-and-time">
                    <input type="date" name="startTrip" id="startTrip" onChange={(e) => { setStartTripDate(e.target.value); console.log("Times are changing", startTripDate); }} value={startTripDate} />
                    <input type="time" name="startTrip" id="startTrip" onChange={(e) => { setStartTripTime(e.target.value); console.log(startTripTime); }} value={startTripTime} />
                  </div>
                </div>





                <div className="form-label-input">
                  <label htmlFor="endTrip">End of trip</label>
                  <div className="date-and-time">
                    <input type="date" name="endTrip" id="endTrip" onChange={(e) => { setEndTripDate(e.target.value) }} value={endTripDate} />
                    <input type="time" name="endTrip" id="endTrip" onChange={(e) => { setEndTripTime(e.target.value) }} value={endTripTime} />
                  </div>
                </div>

              </div>





              <div className="form-label-input">
                <h2>Participants</h2>
                <div className="checkbox-div ">
                  {employees.map((employee, index) => showEmployees(employee, index))}
                </div>
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={onSaveClick}>Save</button>

        </form>
      </div>
    </>
  );
}
