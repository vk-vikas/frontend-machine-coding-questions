import { useState } from "react";
import "./App.css";
import Otp from "./components/Otp";

function App() {
  return (
    <>
      <Otp
        length={6}
        onOtpSubmit={(otp) => console.log(`the submitted otp is: ${otp}`)}
      />
    </>
  );
}

export default App;
