import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configs/Url.json";


function EditStudent() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    school: "", // Assuming school is the new field
  });

  let params = useParams();
  let navigate = useNavigate();

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(`${config.StartUrl}api/student/${params.id}`, {
        name: userForm.name,
        email: userForm.email,
        school: userForm.school,
      })
      .then((res) => {
        console.log({ status: res.status });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.StartUrl}api/student/${params.id}`)
      .then((res) => {
        setUserForm({
          name: res.data.name,
          email: res.data.email,
          school: res.data.school,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="form-wrapper">
        <form onSubmit={onUpdate}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={userForm.email}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">School</label>
            <input
              type="text"
              className="form-control"
              name="school"
              id="school"
              value={userForm.school}
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
