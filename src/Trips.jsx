import { useEffect, useState } from "react";
import { getProducts } from "./services/productService";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    getProducts("trips").then((res) => {
      setTrips(res);
    });
  }, []);
  function renderTrip(t) {
    return (
      <a key={t.id} className="card-hover" href={"/tripform/" + t.id}>
        <div className="card">
          <div className="trip-display">
            <div className="img-container">
              <img className="trip-img" src={"images/items/" + t.id + ".jpg"} alt="name " />
            </div>

            <h2>{t.title} {t.id}</h2>


            <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
            </div>


            <p>{t.description}</p>
          </div>

        </div>
      </a>
    );
  }
  return (
    <>
      <h1>Trips</h1>
      <div className="card-wraper">
        <a className="card-hover" href={"/newtripform"}>
          <button className="btn-plus card">+ Add trip</button>
        </a>
        {trips.map(renderTrip)}
      </div>

    </>
  )
}