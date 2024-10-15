

import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [otpcode, setOtpcode] = useState("");

  if ("OTPCredential" in window) {
    const ac = new AbortController();
   console.log("otp crediatial granted");
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal
      })
      .then((otp) => {
        setOtpcode(otp.code);
        console.log("otp")
        ac.abort();
      })
      .catch((err) => {
        ac.abort();
        console.log("otp",err)

      });
  }

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
