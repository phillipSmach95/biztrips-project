import "./App" 
import "./TripForm.css"

export default function MeetingForm() {
  return (
    <>
      <h1>Meeting Data</h1>
      <form action="" method="post">
        <label htmlFor="">select Trip to add meeting</label>
        <select name="" id="">
          <option value="some Trip">some Trip</option>
          <option value="some other Trip">some otherTrip</option>
        </select>
        <label htmlFor="">title</label>
        <input type="text" name="" id="" />
        <label htmlFor="">description</label>
        <input type="text" name="" id="" />
        <div>
          <label htmlFor="">
            <input type="text" name="" id="" />
            paricipants
          </label>
        </div>
      </form>
    </>
  );
}
