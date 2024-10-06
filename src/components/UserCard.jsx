import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
    const {_id, firstName, lastName, photoURL, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async(status, userID) => {
      try {
       const res = await axios.post(BASE_URL + "/request/send/" + status + "/"+ userID, {}, {
         withCredentials: true,
       })
       dispatch(removeFeed(userID))
      } catch (error) {
       console.error(error)
      }
     }
  
    return (
      <div className="card bg-base-300 w-80 h-2/4 shadow-xl cursor-pointer">
        <figure>
          <img
            src={photoURL}
            alt="Profile"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title font-bold">{firstName + " " + lastName}</h2>
          {age && gender && <p className="font-medium">{age + ", " + gender}</p>}
          <p className="font-medium">{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary font-bold"
             onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
            <button className="btn btn-secondary font-bold"
             onClick={() => handleSendRequest("interested",_id)}>Interested</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  