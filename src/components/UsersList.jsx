import axios from "axios";
import { useEffect, useState } from "react";

function UsersList({ setViewUser }) {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL_API}/auth`).then((response) => {
      console.log(response.data);
      const user=response.data.filter(user=>{
        return user.role!=='admin'
      })
      setUsers(user);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setViewUser(false);
        }}
      >
        Back
      </button>
      <h1>List of users</h1>
      <p>
        <strong>Total No of Users: {users?.length}</strong>
      </p>
      {users?.map((user, index) => {
        return (
          <div key={user._id}>
            <h5>User No:{index+1}</h5>
            <p>Name:{user.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default UsersList;
