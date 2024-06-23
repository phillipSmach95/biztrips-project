import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./services/productService";

export default function Meetings(){
    const [trips, setTrips] = useState([]);
    useEffect(() => {
      getProducts("trips").then((res) => {
        setTrips(res);
      });
    }, []);

    function renderMeetings(m) {
        
        return(<>
        <label htmlFor="meetingtitle">Meeting title</label>
        <input type="text" name="meetingtitle" id="meetingtitle" value={m.title}/>
        <div>
                <Link to="/meetingform">
                  edit meeting
                </Link>
              </div>
        </>)
}
    function renderTrip(t) {
      return (
        <div className="product" key={t.id}>
          <figure>
            <div>
              <img src={"images/items/" + t.id + ".jpg"} alt="name " />
            </div>
            <figcaption>
              <a href="#. . . ">{t.title}</a>
              <div>
                <span>
                  {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
                </span>
              </div>
              <p>{t.description}</p>
              <div>
                {t.meetings.map(renderMeetings)}
              </div>
              
            </figcaption>
          </figure>
        </div>
      );
    }
    return(
        <>
        <section id="filters">
            <label htmlFor="month">Filter by Month:</label>{" "}
            <select id="size">
              <option value="">All months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
            </select>
          </section>
          {trips.map((t)=>renderTrip(t))} 
        </>
    )
}