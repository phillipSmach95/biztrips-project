import { useEffect, useState } from "react"
import "./App"
 
import { getProduct } from "./services/productService"
import { useParams } from "react-router-dom"

export default function EmployeeForm() {
    const [name, setName] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const onSubmit = (event) => {
        event.preventDefault()
        const body = {
            name,
            emergencyContact: emergencyContact,
        }
        console.log(body);
    }
    let { employeeId } = useParams()
    useEffect(() => {
        getProduct("employees", employeeId).then((res) => {
            setName(res.name)
            setEmergencyContact(res.emergencyContact)
        })
    }, [employeeId])
    return (
        <>
            <div>
                <h1>Employee Data</h1>
                <form onSubmit={onSubmit} className="card">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} value={name} />
                    <label htmlFor="contact">emergency contact</label>
                    <input type="text" name="contact" id="contact" onChange={(e) => setEmergencyContact(e.target.value)} value={emergencyContact} />
                    <button type="submit">Save</button>
                </form>
            </div>
        </>
    )
}