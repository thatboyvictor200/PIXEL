import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <img
        src="/pixel-splash.png"
        alt="Pixel Splash"
        className="w-4/5 max-w-xs"
      />
    </motion.div>
  );
}
