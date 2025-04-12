import React, { useEffect, useRef, useState } from "react";

const Otp = ({ length, onOtpSubmit }) => {
  const [inputArray, setInputArray] = useState(new Array(length).fill(""));
  const inputArrayRef = useRef([]);

  useEffect(() => {
    inputArrayRef.current[0]?.focus();
  }, []);

  const handleClick = (index) => {
    // set the cursor position to the end of the input
    inputArrayRef.current[index].setSelectionRange(1, 1);
  };

  const handleChange = (inputValue, index) => {
    if (isNaN(inputValue)) return;
    const sanataizedValue = inputValue.trim().slice(-1);
    setInputArray((prev) => {
      const newArray = [...prev];
      newArray[index] = sanataizedValue;

      // check if the length of the combined OTP is equal to the expected length
      const combinedOtp = newArray.join("");
      if (combinedOtp.length === length) {
        onOtpSubmit(combinedOtp);
      }

      return newArray;
    });

    // check because we cannot skip empty valueon press of spacebar
    sanataizedValue && inputArrayRef.current[index + 1]?.focus();
  };

  const handleBackspace = (e, index) => {
    // need to study this more
    // onkeyup used not onkeydown, as keydown->onchange->onkeyup is the order of execution
    if (e.key === "Backspace") {
      inputArrayRef.current[index - 1]?.focus();
    }
  };
  return (
    <div>
      {inputArray.map((inputBox, index) => (
        <input
          key={index}
          ref={(el) => (inputArrayRef.current[index] = el)}
          type="text"
          className="inputBox"
          value={inputArray[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyUp={(e) => handleBackspace(e, index)}
          onClick={(e) => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Otp;
