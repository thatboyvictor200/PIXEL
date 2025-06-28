import { useState } from "react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import "../styles/number.css";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function NumberEntry() {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("ng");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    const fullPhone = "+" + phone;

    if (!isValidPhoneNumber(fullPhone)) {
      setError("❌ Please enter a valid phone number.");
      return;
    }

    setError("");
    localStorage.setItem("pixel-phone", fullPhone);
    navigate("/verify");
  };

  return (
    <div className="phone-entry-page">
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
            setPhone(val);
          
            // Safely check if 'iso2' exists on data
            if (data && typeof data === "object" && "iso2" in data) {
              setCountryCode((data as any).iso2 || "ng");
            } else {
              setCountryCode("ng");
            }
          }}
          
          inputClass="!bg-gray-900 !rgb(195, 195, 195) !border-none !w-full !py-3"
          containerClass="phone-input-container"
          buttonClass="!bg-gray-800 !border-none !rounded-l-lg"
          dropdownClass="!bg-black !rgb(195, 195, 195)"
          inputStyle={{
            borderRadius: "0.75rem",
            width: "100%",
            backgroundColor: "#111827",
            color: "rgb(195, 195, 195)",
            fontSize: "1rem"
          }}
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <Button
          onClick={handleContinue}
          className="phone-button"
        >
          Continue
        </Button>
      </motion.div>
    </div>
  );
}
