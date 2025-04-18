import React from "react";

const Settings = ({ data, setData }) => {
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      theme: e.target.value,
    }));
  };
  return (
    <div className="form">
      <label>
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={data.theme === "dark"}
          onChange={(e) => handleChange(e)}
        />
        Dark
      </label>
      <label>
        <input
          type="radio"
          name="theme"
          value="light"
          checked={data.theme === "light"}
          onChange={(e) => handleChange(e)}
        />
        Light
      </label>
    </div>
  );
};

export default Settings;
