import { Link } from "react-router-dom"
import "./App"
import "./TripForm.css"
export default function Empoyees(){
    return(<>
    <h1>Employees</h1>
    <Link to={"/employeeform"}>employee</Link>
    </>)
}