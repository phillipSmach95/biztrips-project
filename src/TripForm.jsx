import { useState } from "react";
import "./TripForm.css";

export default function TripForm() {
  return (
    <>
    <div className="content">
        <h1>Trip Modus</h1>

      <form action="" method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
          <label htmlFor="description">Description</label>
          <textarea rows={3} name="description" id="description" />
          <label htmlFor="startTrip">Start of Trip</label>
          <input type="date" name="startTrip" id="startTrip" />
          <label htmlFor="endTrip">End of trip</label>
          <input type="date" name="endTrip" id="endTrip" />
        </div>
        <div className="checkbox-div">
          <label htmlFor="employee1">
            <input type="checkbox" name="employee1" id="employee1" />
            Mitarbeiter 1
          </label>
          <label htmlFor="employee2">
            <input type="checkbox" name="employee2" id="employee2" />
            Mitarbeiter 2
          </label>
        </div>
      </form>
    </div>
    </>
  );
}
