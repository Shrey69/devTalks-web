import { useState } from "react"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
const [emailID, setEmail]  =useState("");
const [password, setPassword]  =useState("");
const [firstName, setFirstname]  =useState("");
const [lastName, setLastname]  =useState("");
const [error, setError] = useState("")
const [isLogin, setIsLogin] = useState(true)
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

  const handleSignUp =  async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailID,
        password,
      }, {
        withCredentials: true,
      })
      dispatch(addUser(res.data.data))
      navigate("/profile")
    } catch (error) {
      setError(error?.response?.data || "something went wrong")
      console.error(error)
      
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl  ">
  <div className="card-body">
    <h2 className="card-title justify-center font-bold">{isLogin ? "LOGIN": "SIGN UP"}</h2>
    <div>

   {!isLogin && <> <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text font-semibold">Firstname</span>
    
  </div>
  <input type="text" value={firstName} onChange={(e) => setFirstname(e.target.value)}  className="input input-bordered w-full max-w-xs" />
  
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text font-semibold">Lastname</span>
    
  </div>
  <input type="text" value={lastName} onChange={(e) => setLastname(e.target.value)}  className="input input-bordered w-full max-w-xs" />
  
</label></>}

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
  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="input input-bordered w-full max-w-xs" />
  
</label>
    </div>
    <p className="text-red-500">{error}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary font-bold" onClick={isLogin? handleLogin: handleSignUp}>{isLogin ? "Login": "Sign Up"}</button>
    </div>

    <p className="font-semibold  m-auto  py-2 cursor-pointer" onClick={()=> setIsLogin((value)=> !value)}>{isLogin? "New user, Sign Up here!": "Existing user, Login here!"}</p>
   
  </div>
</div>
    </div>
  )
}

export default Login