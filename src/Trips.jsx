import { useEffect, useState } from "react";
import { deleteProduct, getProducts } from "./services/productService";
import Spinner from "./Spinner";
export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDeleteIconClick = (id, category)=>{
    deleteProduct(category,id).then(()=>{
      setReload(true)
    })
}
  useEffect(() => {
    setLoading(true)
    getProducts("trips").then((res) => {
      setTrips(res);
      setLoading(false);
      setReload(false)
    });
  }, [reload]);
  function renderTrip(t) {
    return (
      <div className="card-hover" key={t.id}>
      <button onClick={()=>onDeleteIconClick(t.id,"trips")} className="delete-btn"><img className="icon" src={"images/delete-icon.png"} alt="delete" /></button>
          
      <a href={"/tripform/" + t.id}>
        <div className="card">
          <div className="trip-display">
            <div className="img-container">
              <img className="trip-img" src={"images/items/" + t.id + ".jpg"} alt="name " />
            </div>

            <h2>{t.title}</h2>


            <div>
              <span>
                {t.startTrip[2] + "-" + t.startTrip[1] + "-" + t.startTrip[0]}
              </span>
            </div>


            <p>{t.description}</p>
          </div>

        </div>
      </a>
        </div>
    );
  }
  return (
    <>
      <h1>Trips</h1>
      <div className="card-wraper">
        <a className="card-hover" href={"/newtripform"}>
          <button className="btn-plus card">+ Add trip</button>
        </a>
        {loading ? Spinner():null}
        {trips.map(renderTrip)}
      </div>

    </>
  )
}