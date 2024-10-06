import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { acceptRequest, rejectRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch = useDispatch()
  const requests = useSelector(store => store.requests)
  
  const reviewRequests = async (status, _id) => {
    try {
        const res = await axios.post(BASE_URL + "/request/review/"+ status + "/" + _id ,{},{
            withCredentials: true,
        })
        dispatch(rejectRequest(_id))
       
  
        
    } catch (error) {
        console.error(error)
    }
  }

  const fetchRequests = async () => {
    try {
        const res = await axios.get(BASE_URL + "/user/requests", {
            withCredentials: true,
        })
       dispatch(acceptRequest(res.data.data))

        
    } catch (error) {
        console.error(error)
    }
}
useEffect(()=> {
  fetchRequests()
},[])



   if(!requests) return ;
    if(requests.length === 0) return <h1 className="font-bold text-xl flex justify-center my-10">No requests found</h1>
      return (
    <div className="text-center my-10  ">
        <h1 className="font-bold text-2xl">REQUESTS</h1>

        {requests.map((request) =>{
            const {_id, firstName, lastName, gender, about, photoURL, age} = request.fromUserID;
            return (
                <div key={_id} className="flex justify-between items-center p-4 m-4 bg-base-300 rounded-2xl w-[96%] md:w-3/5 mx-auto ">
                   <div>  <img className="w-20 h-20 rounded-full" src={photoURL} alt="pfp" /></div>
                   <div className="text-left mx-4">
                    <h2 className="text-xl font-bold">{firstName + " " + lastName}  </h2>
                    {age && gender && <p>{age+ ", "+ gender}</p>}
                    <p>{about}</p>
                    </div>
                    <div className='flex flex-col space-y-2  '>
                    <button className="btn btn-active btn-primary font-bold"
                    onClick={() => reviewRequests("accepted", request._id)}>Accept</button>
                    <button className="btn btn-active btn-secondary font-bold" 
                    onClick={() => reviewRequests("rejected", request._id)}>Reject</button>
                    
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default Requests