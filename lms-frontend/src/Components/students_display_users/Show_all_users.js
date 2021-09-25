import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../actions/Users";
import { useHistory } from "react-router";

import "./CardStyles.css";

let option_academic = [];

export const Show_all_users = () => {
  const dispatch = useDispatch();

  const [academic, setAcademic] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getUsers());
  }, [dispatch]);

  const academicData = useSelector((state) => state.UserReducer.users);
  console.log("all users", academicData);
  option_academic = academicData?.filter((user) => {
    return user.role === "Lab Instructor" || user.role === "Lecturer";
  });

  //user.role === 'labInstructor'&& user.role === 'lecturer'
  console.log("filter user", option_academic);

  useEffect(() => {
    setAcademic(option_academic);
    if (option_academic) {
      setLoading(false);
    }
  }, [academicData]);

  return (
    <>
      {academic?.map((user) => (
        <div class="row">
          <div class="col-lg-5">
            <Card user={user} key={user._id} />
          </div>
        </div>
      ))}
    </>
  );
};

const Card = ({ user }) => {
  console.log(user);

  const history = useHistory();

  const singlePage = (e) => {
    console.log(e);
    history.push(`academicStaff/${user._id}`);
  };

  return (
    <div className="card">
      <button onClick={singlePage}>
        <div className="card-body">
          <img
            className="card-img"
            alt="user"
            src={`http://localhost:5000/${user.profile_photo}`}
          />
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
          <p className="card-text">{user.role}</p>
        </div>
      </button>
    </div>
  );
};