import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
function App() {
  const [otp, setOtp] = useState("");
  useEffect(() => {
    let ac = new AbortController();
    setTimeout(() => {
      // abort after 10 minutes
      ac.abort();
    }, 10 * 60 * 1000);
    navigator.credentials
      .get({
        otp: { transport: ["sms"] },
        signal: ac.signal
      })
      .then(otp => {
        setOtp(otp.code);
        //console.log("your otp code is", otp.code);
      })
      .catch(err => {
        console.log(err);
      });
  });
  return (
    <div>
    <h1>Web Otp Example Code</h1>
    <input type="text" inputmode="numeric" name="one-time-code" value={otp} />
  </div>
  );
}

export default App;
