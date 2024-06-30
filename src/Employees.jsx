import { Link } from "react-router-dom"
import "./App"
import "./TripForm.css"
import { useEffect, useState } from "react"
import { getProducts } from "./services/productService"
export default function Empoyees() {
    const [employees, setEmployees] = useState([])
    function renderEmployees(employee, i) {
        return (<>
        <div className="card">

            <p key={i}>{employee.name}</p>
            <p >{employee.emergencyContact}</p>
            <Link to={"/employeeform/" + employee.id}>edit</Link>
        </div>
        </>)
    }
    useEffect(() => {
        getProducts("employees").then((res) => {
            setEmployees(res)
        });
    }, []);
    return (<>
       <section id="filters">
        <label htmlFor="month">Filter by Month:</label>{" "}
        <select id="size">
          <option value="">All months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
        </select>
      </section>
        <h1 >Employees</h1>
        <div className="card-wraper">
            {employees.map(renderEmployees)}
        </div>
    </>
    )
}