import React, { useState } from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Interests from "./Interests";

const tabsConfig = [
  {
    id: 1,
    name: "Profile",
    component: Profile,
    validate: (data) => {
      const errors = {};
      if (data.name.length < 5) {
        errors.name = "Name must be at least 5 characters long.";
      }
      if (data.email.length < 5) {
        errors.email = "Email must be at least 5 characters long.";
      }
      if (data.age < 18) {
        errors.age = "Age must be 18 or older.";
      }

      const isValid = Object.keys(errors).length === 0; // Check if errors object is empty
      return { isValid, errors };
    },
  },
  {
    id: 2,
    name: "Interests",
    component: Interests,
    validate: (data) => {
      const errors = {};
      if (data.interests.length < 1) {
        errors.interests = "Please select at least one interest.";
      }
      const isValid = Object.keys(errors).length === 0; // Check if errors object is empty
      return { isValid, errors };
    },
  },
  {
    id: 3,
    name: "Settings",
    component: Settings,
    validate: (data) => {
      return { isValid: true, errors: {} }; // No validation needed for settings
    },
  },
];
const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState({
    name: "vk",
    email: "",
    age: "56",
    interests: [],
    theme: "dark",
  });
  const [errors, setErrors] = useState({}); // Initialize errors state
  const ActiveTabComponent = tabsConfig[activeTab].component; // Default active tab

  const handleNext = () => {
    const { isValid, errors: validationErrors } =
      tabsConfig[activeTab].validate(data); // Validate current tab data
    setErrors(validationErrors); // Update the errors state with validation errors

    if (isValid) {
      // If there are no errors, move to the next tab
      setActiveTab((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setActiveTab((prev) => prev - 1);
  };
  const handleSubmit = () => {
    console.log(data);
  };

  const handleTabClick = (index) => {
    const { isValid, errors: validationErrors } =
      tabsConfig[activeTab].validate(data); // Validate current tab data
    setErrors(validationErrors); // Update the errors state with validation errors

    if (isValid) {
      setActiveTab(index);
    }
  };
  return (
    <div className="tab-form-container">
      <div className="tabs">
        {tabsConfig.map((tab, index) => {
          return (
            <>
              <div
                key={tab.id}
                className="tab"
                onClick={() => handleTabClick(index)}
                style={
                  index === activeTab ? { backgroundColor: "lightyellow" } : {}
                }
              >
                <h5>{tab.name}</h5>
              </div>
            </>
          );
        })}
      </div>
      <div className="form-body">
        <ActiveTabComponent data={data} setData={setData} errors={errors} />
      </div>
      {activeTab > 0 && <button onClick={handlePrev}>prev</button>}
      {activeTab < tabsConfig.length - 1 && (
        <button onClick={handleNext}>next</button>
      )}
      {activeTab === tabsConfig.length - 1 && (
        <button onClick={handleSubmit}>submit</button>
      )}
    </div>
  );
};

export default TabForm;
