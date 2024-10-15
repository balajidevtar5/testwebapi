

import React, { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [otpcode, setOtpCode] = useState("");

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      console.log("OTP Credential granted");
    debugger
      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          console.log("OTP received:", otp.code);
          if (otp && 'code' in otp) {
            setOtpCode(otp.code);
            console.log("OTP received:", otp.code);
          } else {
            console.log("No OTP received or invalid format.");
          }
        })
        .catch((err) => {
          console.error("Error retrieving OTP:", err);
        });

      // Optional: Cleanup in case of component unmount
      return () => {
        ac.abort();
      };
    } else {
      console.log("OTPCredential is not supported in this browser");
    }
  }, []);
  return (
    <div className="App">
      <h1>Web OTP example</h1>
      <h2>Your OTP is: {otpcode}</h2>
      <br />
      <br />
      <h3>
        Send below message from another phone <br /> while chrome is active on
        your mobile screen
      </h3>
      <br />
      <br />
      <h3 className="msg">
        <pre>
          Your test code is: 555444
          <br />
          <br />
          @csb-jsfh2.netlify.app #555444
        </pre>
      </h3>
    </div>
  );
};

export default App;
