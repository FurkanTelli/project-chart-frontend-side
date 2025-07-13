import React, { useEffect, useState } from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'
import { Message } from 'primereact/message';
import axios from 'axios';
import Cookies from 'js-cookie';


const LoginComponent = () => {

  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({ userName: "", password: "", database: "", server: "" })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  const handleInputs = (val, type) => {
    if (type === "databaseServer") {
      setUserInput((prev) => ({
        ...prev,
        server: val.target.value
      }))
    } else if (type === "name") {
      setUserInput((prev) => ({
        ...prev,
        userName: val.target.value
      }))
    } else if (type === "database") {
      setUserInput((prev) => ({
        ...prev,
        database: val.target.value
      }))
    } else {
      setUserInput((prev) => ({
        ...prev,
        password: val.target.value
      }))
    }
  }

  const loginAction = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const sendRequest = await axios.post("http://localhost:7000/connect", userInput);
      if (sendRequest.status === 200) {
        Cookies.set("username", userInput.userName, { expires: 1 });
        Cookies.set("password", userInput.password, { expires: 1 });
        Cookies.set("database", userInput.database, { expires: 1 });
        Cookies.set("server", userInput.server, { expires: 1 });
        setError(false);
        navigate("/admin")
      } 
    } catch (error) {
      setError(true)
      console.log(error)
    }
    setInterval(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="componentDiv">
      <form className='formDiv'>
        <div className="mb-3">
          <label for="databaseServerServer" className="form-label">Server</label>
          <input type="text" className="form-control" id="host" aria-describedby="databaseServer" onChange={(e) => handleInputs(e, "databaseServer")} />
        </div>
        <div className="mb-3">
          <label for="databaseServer" className="form-label">Database</label>
          <input type="text" className="form-control" id="host" aria-describedby="database" onChange={(e) => handleInputs(e, "database")} />
        </div>
        <div className="mb-3">
          <label for="name" className="form-label">Username</label>
          <input type="text" className="form-control" id="name" aria-describedby="name" onChange={(e) => handleInputs(e, "name")} />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={(e) => handleInputs(e, "password")} />
        </div>
        <button type="submit" onClick={loginAction} disabled={userInput.userName.length === 0 || userInput.password.length === 0 || userInput.database.length === 0 || userInput.server.length === 0 || loading === true} className="btn btn-dark form-btn">{loading ? <i className="pi pi-spin pi-cog" style={{ fontSize: '1rem' }}></i> : "Submit"}</button>
        {error ? <Message severity="error" className="w-100 p-2 mt-2" text="Connection Error" /> : ""}
      </form>
    </div>
  )
}

export default LoginComponent;