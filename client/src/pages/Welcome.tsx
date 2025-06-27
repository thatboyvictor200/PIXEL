import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import "../styles/Welcome.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [typedText, setTypedText] = useState("");
  const fullText = " h Chat. Share. Connect. Your world, in one app.";
  const typingSpeed = 50;

  useEffect(() => {
    let index = 0;
    const typing = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(typing);
      }
    }, typingSpeed);
  
    return () => clearInterval(typing);
  }, []);  

  return (
    <div className="welcome-page">
      {/* Sparkles floating in the background */}
      <Sparkles className="sparkle sparkle-1" />
      <Sparkles className="sparkle sparkle-2" />
      <Sparkles className="sparkle sparkle-3" />
      <Sparkles className="sparkle sparkle-4" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="welcome-content"
      >
        <h1 className="welcome-heading flex items-center justify-center gap-3">
          <motion.img
            src="/logo_2.png"
            alt="Pixel Logo"
            className="w-logo"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          Welcome to <span className="pixel-gradient">Pixel</span>
        </h1>

        <p className="welcome-subtext">
          {typedText}
          <span className="cursor">|</span>
        </p>

        <Link to="/register">
          <Button className="welcome-button">Get Started</Button>
        </Link>

        <p className="welcome-policy">
          By clicking the button above, you agree to our{" "}
          <Link to="/terms" className="link-text">Terms</Link> and{" "}
          <Link to="/privacy" className="link-text">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}
