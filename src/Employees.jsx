import "./App"

import { useEffect, useState } from "react"
import { getProducts } from "./services/productService"
export default function Employees() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getProducts("employees").then((res) => {
            setEmployees(res)
        });
    }, []);
    return (<>
        <h1 >Employees</h1>
        <div className="card-wraper">
        <a className="card-hover" href={"/newemployeeform"}>
          <button className="btn-plus card">+ Add employee</button>
        </a>
            {employees.map((employee)=>{
                return (<>
            <a className="card-hover" href={"/employeeform/" + employee.id}>
                <div key={employee.id} className="card">

                    <p >{employee.name}</p>
                    <p >{employee.emergencyContact}</p>
                </div>
            </a>
        </>)})}
        </div>
    </>
    )
}