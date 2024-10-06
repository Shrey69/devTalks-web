import { useSelector } from "react-redux";
import EditProfile from "./EditPRofile";

const Profile = () => {
  const user = useSelector((store) => store.user); 

  return user ? (
    <div>
      <EditProfile user={user} />
    </div>
  ) : (
    <p className="font-bold text-xl flex justify-center my-10">Loading...</p>
  );
};

export default Profile;
