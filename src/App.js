

import React, { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [otpCode, setOtpCode] = useState("");
  const [status, setStatus] = useState("Waiting for OTP...");

  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
      console.log("OTP Credential API is supported.");

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otp) => {
          console.log("Credential received:", otp);
          if (otp && 'code' in otp) {
            setOtpCode(otp.code);
            setStatus("OTP received and autofilled successfully!");
            console.log("OTP code received:", otp.code);
          } else {
            setStatus("No OTP received or incorrect format.");
            console.log("No OTP received or invalid format.");
          }
        })
        .catch((err) => {
          console.error("Error retrieving OTP:", err);
          setStatus(`Error retrieving OTP: ${err.message}`);
        });

      // Optional cleanup if the component unmounts
      return () => {
        console.log("Aborting OTP retrieval");
        ac.abort();
      };
    } else {
      console.log("OTPCredential is not supported in this browser");
      setStatus("OTP autofill is not supported in this browser");
    }
  }, []);
  return (
    <div className="App">
      <h1>Web OTP example</h1>
      <h2>Your OTP is: {otpCode}</h2>
      <p>Status: {status}</p>
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
