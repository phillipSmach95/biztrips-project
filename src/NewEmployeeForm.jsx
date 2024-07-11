import { useState } from "react"
import "./App"

import { postProduct } from "./services/productService"
import { useNavigate } from "react-router-dom"

export default function NewEmployeeForm() {
    const [name, setName] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    
    const onSubmit = (event) => {
        const updatedFormData = {
            name,
            emergencyContact,
        };
        event.preventDefault()
        setFormData(updatedFormData)
        postProduct("employees", updatedFormData)
        console.log(formData);
        navigate("/allemployees")
    }
    return (
        <div className="content-wrapper">
            <h1>Add Employee</h1>
            <div className="card">
                <form >

                    <div className="form-fields">
                        <div className="form-label-input">
                            <label htmlFor="name">name</label>
                            <input type="text" name="name" id="name" onChange={(e) => {setName(e.target.value); }} value={name} />
                        </div>
                        <div className="form-label-input">
                            <label htmlFor="contact">emergency contact</label>
                            <input type="text" name="contact" id="contact" onChange={(e) => {setEmergencyContact(e.target.value); }} value={emergencyContact} />
                        </div>
                    </div>
                    <button className="btn-primary" onClick={onSubmit}>Save</button>
                </form>
            </div>
        </div>
    )
}