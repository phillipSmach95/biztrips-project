import { useParams } from "react-router-dom";
import "./App" 
import "./TripForm.css"
import { useEffect, useState } from "react";
import { getProduct } from "./services/productService";
export default function MeetingForm() {
  const [title, setTitle] = useState("")
  const { meetingId } = useParams();
  useEffect(()=>{
        getProduct("meetings",meetingId).then((res)=>{
          setTitle(res.title)
        })
  },[meetingId])
  return (
    <>
      <h1>Meeting Data</h1>
      <form className="card">
        <label htmlFor="">select Trip to add meeting</label>
        <select name="" id="">
          <option value="some Trip">some Trip</option>
          <option value="some other Trip">some otherTrip</option>
        </select>
        <label htmlFor="">name</label>
        <input type="text" name="" id="" value={title} />
        <label htmlFor="">description</label>
        <input type="text" name="" id="" />
        <div>
          <label htmlFor="">
            <input type="text" name="" id="" />
            paricipants
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
