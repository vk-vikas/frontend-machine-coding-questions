import React from "react";

const Profile = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="form">
      <label tpye="text">Name</label>
      <input
        type="text"
        name="name"
        onChange={(e) => handleChange(e)}
        value={data.name}
      />
      <div className="error">{errors.name} </div>
      <label tpye="text">Email</label>
      <input
        type="email"
        name="email"
        onChange={(e) => handleChange(e)}
        value={data.email}
      />
      <span className="error">{errors.email} </span>
      <label type="number">age</label>
      <input
        type="number"
        name="age"
        onChange={(e) => handleChange(e)}
        value={data.age}
      />
      <span className="error">{errors.age} </span>
    </div>
  );
};

export default Profile;
