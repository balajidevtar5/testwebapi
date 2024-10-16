

import React, { useEffect } from "react";
import "./index.css";

const App = () => {
  // const [otpCode, setOtpCode] = useState("");
  // const [status, setStatus] = useState("Waiting for OTP...");
  // useEffect(() => {
  //   if ("OTPCredential" in window) {
  //     const ac = new AbortController();
  //     console.log("OTP Credential API is supported.");

  //     navigator.credentials
  //       .get({
  //         otp: { transport: ["sms"] },
  //         signal: ac.signal,
  //       })
  //       .then((otp) => {
  //         console.log("Credential received:", otp);
  //         if (otp && 'code' in otp) {
  //           setOtpCode(otp.code);
  //           setStatus("OTP received and autofilled successfully!");
  //           console.log("OTP code received:", otp.code);
  //         } else {
  //           setStatus("No OTP received or incorrect format.");
  //           console.log("No OTP received or invalid format.");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error retrieving OTP:", err);
  //         setStatus(`Error retrieving OTP: ${err.message}`);
  //       });

  //     // Optional cleanup if the component unmounts
  //     return () => {
  //       console.log("Aborting OTP retrieval");
  //       ac.abort();
  //     };
  //   } else {
  //     console.log("OTPCredential is not supported in this browser");
  //     setStatus("OTP autofill is not supported in this browser");
  //   }
  // }, []);



  //  const copyToClipboard = () => {
  //   // Create a temporary textarea element to hold the OTP value
  //   const tempInput = document.createElement('textarea');
  //   tempInput.value = otp;
  //   document.body.appendChild(tempInput);
  //   tempInput.select();
  //   // Copy the value to the clipboard
  //   document.execCommand('copy');
  //   // Remove the temporary textarea element
  //   document.body.removeChild(tempInput);
  //   alert('OTP copied to clipboard!');
  // };


   function autoReadSMS(cb) {
// used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 1min
 const signal = new AbortController();
 setTimeout(() => {
   signal.abort();
 }, 1 * 60 * 1000);
 async function main() {
   if ('OTPCredential' in window) {

    console.log("OTPCredential");
      try {
         if (navigator.credentials) {
            try {
               await navigator.credentials
               .get({ abort: signal, otp:{ transport: ['sms']}})
               .then(content => {
                console.log("content",content);
                 if (content && content.code) {
                   cb(content.code);
                 }
               })
               .catch(e => console.log(e));
            } 
            catch (e) {
              return;
            }
         }
      } 
      catch (err) {
        console.log(err);
      }
    }
 }
 main();
}

  useEffect(() => {
    autoReadSMS((otp) => {
      console.log('Received OTP:', otp);
      // You can now use the OTP, for example, set it in a state or auto-fill an input field
      // setOtp(otp); // Assuming you have a state for OTP
    });
  }, []);

  const copyToClipboard = () =>{
    autoReadSMS((otp) => {
      console.log('Received OTP:', otp);
      // You can now use the OTP, for example, set it in a state or auto-fill an input field
      // setOtp(otp); // Assuming you have a state for OTP
    });
  } 

  return (
    <div className="App">
      <h1>Web OTP example</h1>
      {/* <h2>Your OTP is: {otpCode}</h2>
      <p>Status: {status}</p> */}
      <button onClick={copyToClipboard}>Copy OTP</button>
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
