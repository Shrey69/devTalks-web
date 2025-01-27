import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "../utils/connectionSlice"
import { Link } from "react-router-dom"

const Connections = () => {
    const dispatch = useDispatch();
    const connections  = useSelector(store => store.connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true,
            })
            dispatch(addConnection(res.data.data))
            
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchConnections();
    },[])

    if(!connections) return ;
    if(connections.length === 0) return <h1 className="font-bold text-xl flex justify-center my-10">No connections found</h1>
      return (
    <div className="text-center my-10">
        <h1 className="font-bold text-2xl">CONNECTIONS</h1>

        {connections.map((connection) =>{
            const {_id, firstName, lastName, gender, about, photoURL, age} = connection;
            return (
                <div key={_id} className="flex p-4 m-4 bg-base-300 rounded-2xl  w-[92%] md:w-1/2 mx-auto">
                   <div>  <img className="w-20 h-20 rounded-full" src={photoURL} alt="pfp" /></div>
                   <div className="text-left mx-4">
                    <h2 className="text-xl font-bold">{firstName + " " + lastName}  </h2>
                    {age && gender && <p>{age+ ", "+ gender}</p>}
                    <p>{about}</p>
                   
                    </div>
                    <Link to={"/chat/" + _id}>
                    <button  className="btn btn-primary font-semibold  ">Chat</button></Link>
                   
                </div>
            )
        })}
    </div>
  )
}

export default Connections