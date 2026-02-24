import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 0, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  console.log(otp, "otp");

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) {
      return;
    }
    const newOtp = [...otp];
    //allow only one OTP
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //Submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    //Move to next input
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  console.log(inputRefs, "refs");

  const handleClick = (index) => {
    //the cursor should move to the end
    inputRefs.current[index].setSelectionRange(1, 1);

    //focusing on the empty input field if the previous is EMPTY
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }

    //focusing on the other empty string if the current empty field is beign filled
  };

  const handleKeyDown = (index, event) => {
    if (
      event.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      //moving focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div className="otp-section">
      <h3>Enter OTP</h3>
      {otp.length &&
        otp.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <input
                className="otp-input"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                key={index}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
              />
            </React.Fragment>
          );
        })}
    </div>
  );
};

export default OtpInput;
