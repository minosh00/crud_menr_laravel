import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../configs/Url.json";

function CreateStudent() {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    school: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const inputsHandler = (e) => {
    setUserForm((prevNext) => ({
      ...prevNext,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!userForm.name.trim()) {
      newErrors.name = "Name is required";
    } else if (userForm.name.length < 6 || userForm.name.length > 100) {
      newErrors.name = "Name must be between 6 and 100 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userForm.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!userForm.school.trim()) {
      newErrors.school = "School is required";
    }

    setErrors(newErrors);

    // Return  no errors
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post(`${config.StartUrl}api/student/`, userForm)
        .then((res) => {
          console.log(res.data);
          setUserForm({
            name: "",
            email: "",
            school: "",
          });
          alert("Student created successfully!");
          setSuccess(true);

          setTimeout(() => {
            setSuccess(false);
          }, 3000);
        })
        .catch((error) => {
          alert("Student created Unsuccessfully!");
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="form-">
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={userForm.name}
              onChange={inputsHandler}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
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
            {errors.email && <div className="text-danger">{errors.email}</div>}
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
            {errors.school && (
              <div className="text-danger">{errors.school}</div>
            )}
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateStudent;
