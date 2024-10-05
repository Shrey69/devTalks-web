import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false)

  const saveUpdate = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, gender, age, about, photoURL },
        {
          withCredentials: true,
        }
      );
      console.log("API response:", res?.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.error("Error response:", error?.response?.data);
    }
  };

  return (
   <> <div className="flex justify-center space-x-8 my-10">
      <div className="flex justify-center">
        <div className="card bg-base-300 w-80  shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center font-bold">EDIT PROFILE</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">Firstname</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">Lastname</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">Photo</span>
                </div>
                <input
                  type="text"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">Age</span>
                </div>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>

              <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text font-semibold">About</span>
  </div>
  <textarea
    className="textarea textarea-bordered w-full max-w-xs"
    placeholder="Bio"
    value={about}
    onChange={(e) => setAbout(e.target.value)}
  />
</label>


              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text font-semibold">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary font-bold"
                onClick={saveUpdate}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{
          firstName,
          lastName,
          gender,
          age,
          about,
          photoURL, // Ensure consistency between photoURL in EditProfile and UserCard
        }}
      />
    </div>
  {showToast && ( <div className="toast toast-top toast-end">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>)}
    </>
  );
};

export default EditProfile;
