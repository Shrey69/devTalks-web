import { useSelector } from "react-redux";
import EditProfile from "./EditPRofile";

const Profile = () => {
  const user = useSelector((store) => store.user); // Fetch user from Redux store

  return user ? (
    <div>
      <EditProfile user={user} />
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default Profile;
