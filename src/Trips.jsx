import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "./services/productService";

export default function Trips(){
    const [trips, setTrips] = useState([]);
    useEffect(() => {
      getProducts("trips").then((res) => {
        setTrips(res);
      });
    }, []);
    function renderTrip(t) {
      return (
        <div className="product" key={t.id}>
          <figure>
            <div>
              <img src={"images/items/" + t.id + ".jpg"} alt="name " />
            </div>
            <figcaption>
              <h1>{t.title} {t.id}</h1>
              <div>
                <span>
                  {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
                </span>
              </div>
              <p>{t.description}</p>
              <div>
                <Link to={"/tripform/"+t.id}>
                  Add to Triplist
                </Link>
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
          {trips.map(renderTrip)} 
        </>
    )
}