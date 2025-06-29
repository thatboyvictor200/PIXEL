import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from "libphonenumber-js";

import "../index.css";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function NumberEntry() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("ng");
  const [message, setMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();
  const toastRef = useRef<HTMLDivElement>(null);

  // Detect user's country using IP
  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => {
        if (data?.country_code) setCountryCode(data.country_code.toLowerCase());
      })
      .catch(() => setCountryCode("ng"));
  }, []);

  // Load reCAPTCHA script
  useEffect(() => {
    if (!document.querySelector("#recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const showToast = (msg: string) => {
    setMessage(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 5000);
  };

  const handleContinue = () => {
    const fullPhone = "+" + phone;
    if (!isValidPhoneNumber(fullPhone)) {
      showToast("❌ Please enter a valid phone number.");
      return;
    }

    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute('<your_site_key>', { action: 'submit' }).then(() => {
          localStorage.setItem("pixel-phone", fullPhone);
          navigate("/verify");
        });
      });
    } else {
      showToast("⚠️ reCAPTCHA failed to load. Please refresh.");
    }
  };

  return (
    <div className="phone-entry-page relative">
      {toastVisible && (
        <div
          ref={toastRef}
          className="toast-box"
        >
          {message}
          <motion.div
            className="toast-progress"
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 5 }}
          />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="phone-entry-box"
      >
        <h2 className="phone-heading">Enter your phone number</h2>

        <PhoneInput
          country={countryCode}
          value={phone}
          onChange={(val, data) => {
            setPhone(val.replace(/[^\d]/g, ""));
            if (data && typeof data === "object" && "iso2" in data) {
              setCountryCode((data as any).iso2 || "ng");
            }
          }}
          inputClass="!bg-gray-900 !border-none !w-full !py-3"
          containerClass="phone-input-container"
          buttonClass="!bg-gray-800 !border-none !rounded-l-lg"
          dropdownClass="!bg-black"
          inputStyle={{
            borderRadius: "0.75rem",
            width: "100%",
            backgroundColor: "#111827",
            color: "rgb(195,195,195)",
            fontSize: "1rem"
          }}
        />

        <Button onClick={handleContinue} className="phone-button">
          Continue
        </Button>

        <div id="recaptcha-container" className="hidden" />
      </motion.div>
    </div>
  );
}
