import { useEffect, useState, } from "react";
import { getProducts, postProduct } from "./services/productService";
import { useNavigate } from "react-router-dom";

export default function NewTripForm() {
    const [employees, setEmployees] = useState([])
    const [title, setTitle] = useState("")
    const [paticipants, setPaticipants] = useState([])
    const [meetings, setMeetings] = useState([])
    const [description, setDescription] = useState("")
    const [startTripDate, setStartTripDate] = useState("")
    const [startTripTime, setStartTripTime] = useState("")
    const [endTripDate, setEndTripDate] = useState("")
    const [endTripTime, setEndTripTime] = useState("")
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const updateFormdata = () => {
        setFormData({
            title: title,
            meetings: meetings,
            description: description,
            startTrip: toIntArray(startTripDate, startTripTime),
            endTrip: toIntArray(endTripDate, endTripTime),
            paticipants: paticipants
        });
    };
    const onSaveClick = (event) => {
        event.preventDefault()
        updateFormdata();
        postProduct("trips", formData)
        navigate("/trips")

    }
    const toStringDate = (date) => `${date[0]}-${String(date[1]).padStart(2, '0')}-${String(date[2]).padStart(2, '0')}`;
    const toStringTime = (date) => `${String(date[3]).padStart(2, '0')}:${String(date[4]).padStart(2, '0')}`;
    const toIntArray = (stringDate, stringTime) => {
        const [year, month, day] = stringDate.split('-').map((e) => Number(e));
        const [hour, minute] = stringTime.split(':').map((e) => Number(e));
        const updatedValues = [year, month, day, hour, minute];
        return updatedValues
    }
    useEffect(() => {
        getProducts("employees").then((res) => setEmployees(res))
    }, [])
    return (
        <>
            <h1>Edit Trip </h1>
            <div className=" card">
                <form  >
                    <div className="form-fields">
                        <div className="grid-2 ">
                            <div>
                                <div className="form-label-input">
                                    <label htmlFor="title">Title </label>
                                    <input type="text" name="title" id="title" onChange={(e) => { setTitle(e.target.value); updateFormdata(); }} value={title} />
                                </div>
                                <div className="form-label-input">
                                    <label htmlFor="description">Description</label>
                                    <textarea rows={3} name="description" id="description" onChange={(e) => { setDescription(e.target.value); updateFormdata(); }} value={description} />
                                </div>
                                <div className="form-label-input">
                                    <label htmlFor="startTrip" >Start of Trip</label>
                                    <div className="date-and-time">
                                        <input type="date" name="startTrip" id="startTrip" onChange={(e) => { setStartTripDate(e.target.value); updateFormdata(); console.log("Times are changing", startTripDate); }} value={startTripDate} />
                                        <input type="time" name="startTrip" id="startTrip" onChange={(e) => { setStartTripTime(e.target.value); updateFormdata(); console.log(startTripTime); }} value={startTripTime} />
                                    </div>
                                </div>
                                <div className="form-label-input">
                                    <label htmlFor="endTrip">End of trip</label>
                                    <div className="date-and-time">
                                        <input type="date" name="endTrip" id="endTrip" onChange={(e) => { setEndTripDate(e.target.value); updateFormdata(); }} value={endTripDate} />
                                        <input type="time" name="endTrip" id="endTrip" onChange={(e) => { setEndTripTime(e.target.value); updateFormdata(); }} value={endTripTime} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-label-input">
                                <h2>Participants</h2>
                                <div className="checkbox-div ">
                                    {employees.map((employee) => {
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
                                        return ((
                                            <label key={employee.id} htmlFor={`employee${employee.id}`}>
                                                <input type="checkbox" name={`employee${employee.id}`} id={`employee${employee.id}`} value={employee.id} onChange={(e) => { handleChange(e.target.checked); updateFormdata(); }} checked={value} />
                                                {employee.name}
                                            </label>
                                        ))
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn-primary" onClick={onSaveClick}>Save</button>
                </form>
            </div>
        </>
    )
}