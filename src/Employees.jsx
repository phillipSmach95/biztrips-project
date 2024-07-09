import "./App"

import { useEffect, useState } from "react"
import { deleteProduct, getProducts } from "./services/productService"
export default function Employees() {
    const [employees, setEmployees] = useState([])
    const [reload, setReload] = useState(false)
const onDeleteIconClick = (id, category)=>{
    deleteProduct(category,id)
    setReload(true)
}
    useEffect(() => {
        getProducts("employees").then((res) => {
            setEmployees(res)
        });
    }, [reload]);
    return (<>
        <h1 >Employees</h1>
        <div className="card-wraper">
            <a className="card-hover" href={"/newemployeeform"}>
                <button className="btn-plus card">+ Add employee</button>
            </a>
            {employees.map((employee) => {
                return (
                    <div className="card-hover" key={employee.id}>
                        <button onClick={()=>onDeleteIconClick(employee.id,"employees")} className="delete-btn"><img className="icon" src={"images/delete-icon.png"} alt="delete" /></button>
                            
                        <a href={"/employeeform/" + employee.id}>
                            <div className="card">

                                <p >{employee.name}</p>
                                <p >{employee.emergencyContact}</p>
                            </div>
                        </a>
                    </div>
                )
            })}
        </div>
    </>
    )
}