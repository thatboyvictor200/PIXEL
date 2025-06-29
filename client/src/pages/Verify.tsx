import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { auth } from "../lib/firebase";
import { signInWithPhoneNumber, type ConfirmationResult, RecaptchaVerifier } from "firebase/auth";
import "../styles/verify.css";

// Extend window to avoid TypeScript error
declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export default function Verify() {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const phone = localStorage.getItem("pixel-phone");

  useEffect(() => {
    if (!phone) return;

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response: any) => {
          console.log("reCAPTCHA verified", response);
        },
      });
    }

    signInWithPhoneNumber(auth, phone, window.recaptchaVerifier)
      .then((result) => setConfirmationResult(result))
      .catch((err) => {
        console.error("SMS not sent", err);
        setError("Failed to send verification code. Please try again.");
      });
  }, [phone]);

  const handleChange = (val: string, idx: number) => {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    if (val && idx < 5) {
      inputs.current[idx + 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    if (confirmationResult) {
      confirmationResult.confirm(code)
        .then((result) => {
          console.log("✅ User verified!", result.user);
        })
        .catch(() => setError("❌ Invalid verification code."));
    }
  };

  return (
    <div className="verify-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="verify-box"
      >
        <h2 className="verify-heading">Enter 6-digit code</h2>

        <p className="verify-subtext">
          We've sent a code to <span className="highlight">{phone}</span>
        </p>

        <div className="otp-box">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputs.current[idx] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value.replace(/\D/g, ""), idx)}
              className="otp-input"
            />
          ))}
        </div>

        {error && <p className="verify-error">{error}</p>}

        <Button onClick={handleVerify} className="verify-button">
          Verify
        </Button>
      </motion.div>

      {/* Invisible reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
