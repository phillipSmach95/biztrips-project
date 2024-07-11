import { useEffect, useState } from "react"
import "./App"

import { deleteProduct, getProduct, patchProduct } from "./services/productService"
import { useNavigate, useParams } from "react-router-dom"

export default function EmployeeForm() {
    const [name, setName] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [formData, setFormData] = useState({})
    const { employeeId } = useParams()
    const navigate = useNavigate()

    const updateFormdata = ()=>{
        setFormData({
            name:name,
            emergencyContact:emergencyContact,
        })
    }
    const onDeleteConfirm = (event)=>{
        event.preventDefault()
        if(window.confirm("are you sure you want to delete the employee")){
          deleteProduct("employees",employeeId)
          navigate("/employees")
        }
      }
    const onSubmit = (event) => {
        updateFormdata()
        event.preventDefault()
      console.log(formData);
      patchProduct("employees",employeeId,formData)
      navigate("/employees")
    }
    useEffect(() => {
        getProduct("employees", employeeId).then((res) => {
            setName(res.name)
            setEmergencyContact(res.emergencyContact)
        })
    }, [employeeId])
    return (
        <div className="content-wrapper">
            <h1>Edit Employee</h1>
            <div className="card">
                    <button className="delete-btn" onClick={onDeleteConfirm}><img className="icon" src={"../images/delete-icon.png"} alt="delete" /></button>
                <form className="">

                    <div className="form-fields">
                        <div className="form-label-input">
                            <label htmlFor="name">name</label>
                            <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value); updateFormdata()}} value={name} />
                        </div>
                        <div className="form-label-input">

                            <label htmlFor="contact">emergency contact</label>
                            <input type="text" name="contact" id="contact" onChange={(e) => {setEmergencyContact(e.target.value); updateFormdata()}} value={emergencyContact} />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={onSubmit}>Save</button>
                </form>
            </div>
        </div>
    )
}