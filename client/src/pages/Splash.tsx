import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Splash.css"; // import your custom CSS

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/welcome");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="splash-container">
      <img src="/pixel.png" alt="Pixel Logo" className="splash-logo" />
    </div>
  );
}
