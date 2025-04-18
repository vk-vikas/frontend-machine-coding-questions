import React from "react";

const Interests = ({ data, setData, errors }) => {
  const handleChange = (e) => {
    setData((prev) => {
      const updatedInterests = e.target.checked
        ? [...prev.interests, e.target.name]
        : prev.interests.filter((interest) => interest !== e.target.name);

      return { ...prev, interests: updatedInterests };
    });
  };
  console.log(data.interests);
  return (
    <div className="form">
      <label>
        <input
          type="checkbox"
          name="coding"
          checked={data.interests.includes("coding")}
          onChange={(e) => handleChange(e)}
        />
        coding
      </label>
      <label>
        <input
          type="checkbox"
          name="music"
          checked={data.interests.includes("music")}
          onChange={(e) => handleChange(e)}
        />
        music
      </label>
      <label>
        <input
          type="checkbox"
          name="dance"
          checked={data.interests.includes("dance")}
          onChange={(e) => handleChange(e)}
        />
        dance
      </label>
      <span className="error">{errors.interests} </span>
    </div>
  );
};

export default Interests;
