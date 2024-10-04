const UserCard = ({ user }) => {
    const { firstName, lastName, photoURL, age, gender, about } = user;
  
    return (
      <div className="card bg-base-300 w-96 shadow-xl cursor-pointer">
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
            <button className="btn btn-primary font-semibold">Ignore</button>
            <button className="btn btn-secondary font-semibold">Interested</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  