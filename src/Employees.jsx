import "./App"

import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "./services/productService"
import { useParams } from "react-router-dom"
export default function Empoyees() {
    const [employees, setEmployees] = useState([])
    const {employeeId} = useParams()

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
            {employees.map((employee, i)=>{
                return (<>
            <a className="card-hover" href={"/employeeform/" + employee.id}>
                <div className="card">

                    <p key={i}>{employee.name}</p>
                    <p >{employee.emergencyContact}</p>
                </div>
            </a>
        </>)})}
        </div>
    </>
    )
}