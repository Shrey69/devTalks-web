import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
const [emailID, setEmail]  =useState("");
const [password, setPassword]  =useState("");
const [error, setError] = useState("")
const dispatch = useDispatch();
const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailID,
        password,
      }, {
        withCredentials: true,
      })
      dispatch(addUser(res.data))
      navigate("/")
    } catch (error) {
      setError(error?.response?.data || "something went wrong")
      console.error(error)
      
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl  ">
  <div className="card-body">
    <h2 className="card-title justify-center font-bold">Login</h2>
    <div>

    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text font-semibold">Email ID</span>
    
  </div>
  <input type="text" value={emailID} onChange={(e) => setEmail(e.target.value)}  className="input input-bordered w-full max-w-xs" />
  
</label>

<label className="form-control w-full max-w-xs my-4">
  <div className="label">
    <span className="label-text font-semibold">Password</span>
    
  </div>
  <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  className="input input-bordered w-full max-w-xs" />
  
</label>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login