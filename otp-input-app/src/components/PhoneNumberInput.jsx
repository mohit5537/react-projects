import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneNumberInput = () => {
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const handlePhoneNumber = (event) => {
    setPhoneNumberInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //validations
    const regex = /[^0-9]/g;
    if (phoneNumberInput.length < 10 || regex.test(phoneNumberInput)) {
      alert("Invalid Phone number");
      setPhoneNumberInput("");
      return;
    }

    //Call Backend API

    setShowOtpInput(true);
  };

  const handleOtpSubmit = (event) => {
    alert("OTP Validated");
  };

  return (
    <div className="phoneNumber-section">
      {!showOtpInput ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Enter Phone Number</h2>
          <input
            onChange={(e) => handlePhoneNumber(e)}
            value={phoneNumberInput}
            className="phoneNumber-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      ) : (
        <OtpInput length={4} onOtpSubmit={handleOtpSubmit} />
      )}
    </div>
  );
};

export default PhoneNumberInput;
